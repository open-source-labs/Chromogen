/* eslint-disable */
import type {
  RecoilState,
  RecoilValueReadOnly,
  AtomOptions,
  ReadWriteSelectorOptions,
  ReadOnlySelectorOptions,
  SerializableParam,
  AtomFamilyOptions,
  ReadWriteSelectorFamilyOptions,
  ReadOnlySelectorFamilyOptions,
} from 'recoil';
import type { SelectorConfig, SelectorFamilyConfig } from '../types';

import {
  selector as recoilSelector,
  atom as recoilAtom,
  atomFamily as recoilAtomFamily,
  selectorFamily as recoilSelectorFamily,
} from 'recoil';
import { wrapGetter, wrapSetter } from './core-utils';
import { dummyParam } from '../utils/utils';
import { ledger } from '../utils/ledger';
import { wrapFamilyGetter, wrapFamilySetter } from './family-utils';
/* eslint-enable */

/**
 * If transactions.length is greater than 1, the selector is being created after the initial render
 * (i.e. a dynamically generated selector) and will not be tracked. Doing so would break the imports
 * and assertions within the output test file. Same logic is applied to new atoms.
 *
 * If get is undefined, native Async, or Babel-transpiled generator-based async (id'd via RegEx),
 * we don't do any injecting or tracking. Selector just gets created & returned back out.
 *
 * Otherwise, we attempt to wrap get & set methods with custom functions that log the return
 * value on each transaction to the corresponding ledger array.
 *
 * If get returns a promise on page load, we delete selector from the selectors array
 * and do not track it on subsequent calls (using "returnedPromise" flag, since we can't "un-inject").
 */

/* ----- SELECTOR ----- */
export function selector<T>(options: ReadWriteSelectorOptions<T>): RecoilState<T>;
export function selector<T>(options: ReadOnlySelectorOptions<T>): RecoilValueReadOnly<T>;
// Overload function signature
export function selector(config: ReadWriteSelectorOptions<any> | ReadOnlySelectorOptions<any>) {
  const { key, get } = config;
  const { transactions, selectors, setters } = ledger;
  if (
    transactions.length > 0
    || !get
    || get.constructor.name === 'AsyncFunction'
    || get.toString().match(/^\s*return\s*_.*\.apply\(this, arguments\);$/m)
  ) {
    return recoilSelector(config);
  }

  // Wrap get method with tracking logic & update config
  const getter = wrapGetter(key, get);
  const newConfig: SelectorConfig<any> = { key, get: getter };

  // Add setter to newConfig only if set method is defined
  if ('set' in config) {
    const setter = wrapSetter(key, config.set);
    newConfig.set = setter;
    setters.push(key);
  }

  // Create selector & add to ledger
  const trackedSelector = recoilSelector(newConfig);
  selectors.push(trackedSelector.key);
  return trackedSelector;
}

/* ----- ATOM ----- */
export function atom<T>(config: AtomOptions<T>): RecoilState<T> {
  const { transactions, atoms } = ledger;
  const newAtom = recoilAtom(config);

  // Can't use key-only b/c atoms must be passed to getLoadable during transaction iteration
  if (transactions.length === 0) atoms.push(newAtom);

  return newAtom;
}

/* ----- ATOM FAMILY ----- */
export function atomFamily<T, P extends SerializableParam>(
  config: AtomFamilyOptions<T, P>,
): (params: P) => RecoilState<T> {
  const { atomFamilies } = ledger;
  const { key } = config;

  // Initialize new family in atomFamilies tracker
  atomFamilies[key] = {};

  return (params: P): RecoilState<T> => {
    const strParams = JSON.stringify(params);
    // If the atom has already been created, return from cache, otherwise we'll be creating a new
    // instance of an atom every time we invoke this func (which can lead to infinite re-render loop)
    const cachedAtom = atomFamilies[key][strParams];
    if (cachedAtom !== undefined) return cachedAtom;

    const newAtomFamilyMember = recoilAtomFamily(config)(params);
    // Storing every atom created except for dummy atom created by ChromogenObserver's onload useEffect hook
    if (strParams !== dummyParam) atomFamilies[key][strParams] = newAtomFamilyMember;
    return newAtomFamilyMember;
  };
}

/* ----- SELECTOR FAMILY ----- */
export function selectorFamily<T, P extends SerializableParam>(
  options: ReadWriteSelectorFamilyOptions<T, P>,
): (param: P) => RecoilState<T>;
export function selectorFamily<T, P extends SerializableParam>(
  options: ReadOnlySelectorFamilyOptions<T, P>,
): (param: P) => RecoilValueReadOnly<T>;
// Overload function signature
export function selectorFamily<T>(
  config:
    | ReadWriteSelectorFamilyOptions<T, SerializableParam>
    | ReadOnlySelectorFamilyOptions<T, SerializableParam>,
) {
  const { key, get } = config;
  const { transactions, selectorFamilies } = ledger;

  // Testing whether returned function from configGet is async
  if (
    !get
    || transactions.length > 0
    || get(dummyParam).constructor.name === 'AsyncFunction'
    || get(dummyParam)
      .toString()
      .match(/^\s*return\s*_.*\.apply\(this, arguments\);$/m)
  ) {
    return recoilSelectorFamily(config);
  }

  const getter = wrapFamilyGetter(key, get);

  const newConfig: SelectorFamilyConfig<any, SerializableParam> = { key, get: getter };

  let isSettable = false;

  if ('set' in config) {
    isSettable = true;
    const setter = wrapFamilySetter(key, config.set);
    newConfig.set = setter;
  }

  // Create selector generator & add to selectorFamily for test setup
  const trackedSelectorFamily = recoilSelectorFamily(newConfig);
  selectorFamilies[key] = { trackedSelectorFamily, prevParams: new Set(), isSettable };
  return trackedSelectorFamily;
}
