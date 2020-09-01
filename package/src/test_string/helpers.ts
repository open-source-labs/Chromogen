/* eslint-disable */
import type {
  SelectorUpdate,
  Transaction,
  AtomUpdate,
  SetTransaction,
  AtomFamilies,
  SelectorFamilies,
  SelectorFamilyUpdate,
} from '../types/types';
import { SerializableParam } from 'recoil';
/* eslint-enable */

/* ----- HELPER FUNCTIONS ----- */

function initializeAtoms(state: AtomUpdate[], current: boolean): string {
  return state.reduce(
    (initializers, { key, value, previous }) =>
      `${initializers}\t\t\tresult.current.set${key}(${JSON.stringify(
        current ? value : previous,
      )});\n\n`,
    '',
  );
}

function assertState(updates: SelectorUpdate[]): string {
  return updates.reduce(
    (assertions, { key, value }) =>
      `${assertions}\t\texpect(result.current.${key}Value).toStrictEqual(${JSON.stringify(
        value,
      )});\n\n`,
    '',
  );
}

/* ----- SETUP FUNCTIONS ----- */

export function importRecoilState(keyArray: string[]): string {
  return keyArray.reduce((fullStr, key) => `${fullStr}\t${key},\n`, '');
}

export function importRecoilFamily(
  familyObj: AtomFamilies | SelectorFamilies<any, SerializableParam>,
): string {
  return Object.keys(familyObj).reduce(
    (importStr, familyName) => `${importStr}\t${familyName},\n`,
    '',
  );
}

export function writeableHook(keyArray: string[]): string {
  return keyArray.reduce(
    (fullStr, key) => `${fullStr}\tconst [${key}Value, set${key}] = useRecoilState(${key});\n`,
    '',
  );
}

export function readableHook(keyArray: string[]): string {
  return keyArray.reduce(
    (fullStr, key) => `${fullStr}\tconst ${key}Value = useRecoilValue(${key});\n`,
    '',
  );
}

export function atomFamilyHook(transactionArray: Transaction[]): string {
  return transactionArray[transactionArray.length - 1].atomFamilyState.reduce((str, atomState) => {
    const { family, key } = atomState;
    const params = key.substring(family.length + 2);
    return `${str}\tconst [${family + '__' + params + '__Value'}, ${
      'set' + family + '__' + params
    }] = useRecoilState(${family}(${params}));\n`;
  }, '');
}

export function selectorFamilyHook(
  selectorFamilyTracker: SelectorFamilies<any, SerializableParam>,
  isSettable: boolean,
): string {
  return Object.entries(selectorFamilyTracker)
    .filter((familyArr) => familyArr[1].isSettable === isSettable)
    .reduce((str: string, familyArr: [string, { prevParams: Set<any> }]): string => {
      const [familyName, { prevParams }] = familyArr;
      //converting prevParams from set to array
      return `${str}${[...prevParams].reduce((innerStr: string, param: any) => {
        return `${innerStr}\tconst [${familyName + '__' + param + '__Value'}, ${
          'set' + familyName + '__' + param
        }] = useRecoilState(${familyName}(${param}));\n`;
      }, '')}`;
    }, '');
}

export function returnWriteable(keyArray: string[]): string {
  return keyArray.reduce((fullStr, key) => `${fullStr}\t\t${key}Value,\n\t\tset${key},\n`, '');
}

export function returnReadable(keyArray: string[]): string {
  return keyArray.reduce((fullStr, key) => `${fullStr}\t\t${key}Value,\n`, '');
}

export function returnSelectorFamily(
  selectorFamilyTracker: SelectorFamilies<any, SerializableParam>,
  isSettable: boolean,
) {
  Object.entries(selectorFamilyTracker)
    .filter((familyArr) => familyArr[1].isSettable === isSettable)
    .reduce((str: string, familyArr: any): string => {
      const [familyName, { prevParams }] = familyArr;
      return `${str}${[...prevParams].reduce((innerStr: string, param: any) => {
        return `${innerStr}\t\t${familyName + '__' + param + '__Value'},
    \t\t${'set' + familyName + '__' + param},\n`;
      }, '')}`;
    }, '');
}

/* ----- INITIAL RENDER ----- */

export function initializeSelectors(initialRender: SelectorUpdate[]): string {
  return initialRender.reduce(
    (fullStr, { key, value }) => `${fullStr}\tit('${key} should initialize correctly', () => {
\t\texpect(result.current.${key}Value).toStrictEqual(${JSON.stringify(value)});
\t});\n\n`,
    '',
  );
}

export function initializeSelectorFamilies(initialRenderFamilies: SelectorFamilyUpdate[]) {
  return initialRenderFamilies.reduce(
    (initialTests, { key, params, value }) =>
      `${initialTests}\tit('${key}__${JSON.stringify(params)} should initialize correctly', () => {
    \t\texpect(result.current.${key}__${JSON.stringify(
        params,
      )}__Value).toStrictEqual(${JSON.stringify(value)});
    \t});\n`,
    '',
  );
}

/* ----- SELECTORS TEST ----- */

export function testSelectors(transactionArray: Transaction[]): string {
  return transactionArray.reduce(
    (selectorTests, { state, updates, atomFamilyState, familyUpdates }) => {
      const allUpdatedAtoms = [
        ...state.filter(({ updated }) => updated),
        ...atomFamilyState.filter(({ updated }) => updated),
      ];
      const allUpdatedSelectors = [...updates, ...familyUpdates];
      const atomLen = allUpdatedAtoms.length;
      const selectorLen = allUpdatedSelectors.length;

      return atomLen !== 0 && updates.length !== 0
        ? `${selectorTests}\tit('derive correct values when ${
            atomLen > 1
              ? updatedAtoms.reduce(
                  (list, { key }, i) =>
                    `${list}${i === atomLen - 1 ? `and ${key} update` : `${key}, `}`,
                  '',
                )
              : `${updatedAtoms[0].key} updates`
          }', () => {
\t\tconst { result } = renderRecoilHook(useStoreHook);
  
\t\tact(() => {
${initializeAtoms(state, true)}\t\t});
  
${assertState(updates)}\t});\n\n`
        : selectorTests;
    },
    '',
  );
}

/* ----- SETTERS TEST ----- */

export function testSetters(setTransactionArray: SetTransaction[]): string {
  return setTransactionArray.reduce((setterTests, { state, setter }) => {
    const updatedAtoms = state.filter(({ updated }) => updated);

    // ternary check filters out transactions where no writeable selector fired
    return setter
      ? `${setterTests}\tit('${setter.key} should properly set state', () => {
\t\tconst { result } = renderRecoilHook(useStoreHook);
  
\t\tact(() => {
${initializeAtoms(state, false)}\t\t});
  
\t\tact(() => { 
\t\t\tresult.current.set${setter.key}(${JSON.stringify(setter.newValue)});
\t\t});
  
${assertState(updatedAtoms)}\t});\n\n`
      : `${setterTests}`;
  }, '');
}
