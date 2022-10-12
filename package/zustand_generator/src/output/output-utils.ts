/* eslint-disable */
import type { Transaction, InitialRender } from '../types';
// } from '../types';

import { dummyParam } from '../utils/utils';

/* eslint-enable */

/* ----- HELPER FUNCTIONS ----- */

export function importZustandStore(): string {
  return `import useStore from '<ADD STORE FILEPATH>';`;
}

export function testInitialState(initialRender: InitialRender): string {
  return Object.entries(initialRender).reduce((acc, [k, v]) => {
    return (
      acc
      + `\tit('${k} should initialize correctly', () => {\n\t\texpect(result.current.${k}).toStrictEqual(${JSON.stringify(
        v,
      )});\n\t});\n\n`
    );
  }, '');
}

const dummyTransaction = { action: dummyParam, changedValues: {} };

//Takes in an array of transactions and returns a full set of tests ("it blocks") for all actions and corresponding state changes
export function testStateChangesAct(transactions: Transaction<any>[]): string {
  //Groups transactions together based on whether the transactions impact the same slice of state
  //Each "group" of transactions will affect each store parameter 0 or 1 times.
  let groupedTransactions: Transaction<any>[][] = [...transactions, dummyTransaction].reduce(
    (
      acc: {
        groups: Transaction<any>[][];
        currentGroup: Transaction<any>[];
        changedValues: { [nameOfChangedValue: string]: any };
      },
      cur,
    ) => {
      if (
        Object.keys(cur.changedValues).some((v) => acc.changedValues[v])
        || cur.action === dummyParam
      ) {
        acc.groups.push(acc.currentGroup);
        acc.currentGroup = [cur];
        acc.changedValues = Object.keys(cur.changedValues).reduce((acc, k) => {
          acc[k] = true;
          return acc;
        }, {});
      } else {
        acc.currentGroup.push(cur);
        Object.keys(cur.changedValues).forEach((k) => (acc.changedValues[k] = true));
      }
      return acc;
    },
    { groups: [], currentGroup: [], changedValues: {} },
  ).groups;

  //For each group of transactions, we generate an "It block"
  return groupedTransactions.reduce(
    (acc, group) => {
      const { str, actBlock } = generateItBlock(group);
      acc.str += str;
      acc.actStatements = actBlock;
      return acc;
    },
    { str: '', actStatements: '' },
  ).str;
}
//Takes in an entry for a slice of state and generates an expect statement asserting that the state properties have correct value in the store
export function testStateChangesExpect([propertyName, newValue]: [string, any]): string {
  return `\nexpect(result.current.${propertyName}).toStrictEqual(${JSON.stringify(newValue)});`;
}

//Takes in a transaction and generates an act statement using the action name and argument(s)
export function generateActLine<T extends any[]>(t: Transaction<T>): string {
  const { action } = t;
  const args = t.arguments;
  return `\tresult.current.${action}(${args?.map((arg) => JSON.stringify(arg)).join(', ')});\n`;
}

//Takes in an array of grouped Transactions and returns an It Block (unit test) with all act &
// expect statements for transactions in input
function generateItBlock(transactions: Transaction<any>[]): { str: string; actBlock: string } {
  const valuesChanged: string[] = [];
  let expectBlock = '';

  transactions.forEach((t) =>
    Object.entries(t.changedValues).forEach(([changedValue, newValue]) => {
      valuesChanged.push(changedValue);
      expectBlock += testStateChangesExpect([changedValue, newValue]);
    }),
  );

  let newActBlock = transactions.map(generateActLine).join('');

  return {
    str: `\n\tit('${valuesChanged.join(' & ')} should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {\n${newActBlock}\n});
  
      ${expectBlock}  
    });`,
    actBlock: newActBlock,
  };
}
