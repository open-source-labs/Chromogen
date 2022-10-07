import { ledger } from '../utils/ledger';
import { Transaction, InitialRender } from '../types';
import { StoreApi, State, StateCreator, StoreMutatorIdentifier } from 'zustand';

const debug = true;

type Chromogen = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  creatorFunction: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>

type ChromogenImpl = <T extends State>(
  creatorFunction: PopArgument<StateCreator<T, [], []>>
) => PopArgument<StateCreator<T, [], []>>

type PopArgument<T extends (...a: never[]) => unknown> = T extends (
  ...a: [...infer A, infer _]
) => infer R
  ? (...a: A) => R
  : never

type TakeTwo<T> = T extends []
  ? [undefined, undefined]
  : T extends [unknown]
  ? [...a0: T, a1: undefined]
  : T extends [unknown?]
  ? [...a0: T, a1: undefined]
  : T extends [unknown, unknown]
  ? T
  : T extends [unknown, unknown?]
  ? T
  : T extends [unknown?, unknown?]
  ? T
  : T extends [infer A0, infer A1, ...unknown[]]
  ? [A0, A1]
  : T extends [infer A0, (infer A1)?, ...unknown[]]
  ? [A0, A1?]
  : T extends [(infer A0)?, (infer A1)?, ...unknown[]]
  ? [A0?, A1?]
  : never


type StoreDevtools<S> = S extends {
  setState: (...a: infer Sa) => infer Sr
}
  ? {
    setState<A extends string | { type: unknown }>(
      ...a: [...a: TakeTwo<Sa>, action?: A]
    ): Sr
  }
  : never

type Write<T, U> = Omit<T, keyof U> & U

type WithDevtools<S> = Write<S, StoreDevtools<S>>

type NamedSet<T> = WithDevtools<StoreApi<T>>['setState']


const chromogenImpl: ChromogenImpl = (creatorFunction) => (set, get, api) => {

  //get initial render and save it to ledger
  const initialStateEntries = creatorFunction(api.setState, get, api);
  const initialRender: InitialRender = filterOutFuncs(initialStateEntries);
  ledger.initialRender = initialRender;

  //log if debug mode is enabled
  if (debug) console.log({ initialRender });

  type S = ReturnType<typeof creatorFunction>
  (api.setState as NamedSet<S>) = (partial, replace, action, ...args) => {
    const oldStore = filterOutFuncs(get());
    const r = set(partial, replace);
    const newStore = filterOutFuncs(get());
    const changedValues = diffStateObjects(oldStore, newStore)

    const newAction: Transaction<typeof args> = {
      action: typeof action === 'string' ? action : 'UnknownAction',
      changedValues,
      arguments: args,
    }

    ledger.transactions.push(newAction);
    return r;
  }
  return creatorFunction(api.setState, get, api)
}

export const chromogenZustandMiddleware = chromogenImpl as unknown as Chromogen;

const filterOutFuncs = (store) => {
  const result = {};
  for (const [k, v] of Object.entries(store)) {
    if (typeof v !== 'function') result[k] = v;
  }
  return result;
};

const diffStateObjects = (oldStore, newStore) => {
  const changedValues = {};
  for (const [k, v] of Object.entries(newStore)) {
    if (JSON.stringify(oldStore[k]) !== JSON.stringify(v)) changedValues[k] = v;
  }
  return changedValues;
}

