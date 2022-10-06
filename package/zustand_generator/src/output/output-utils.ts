/* eslint-disable */
import type { Transaction, InitialRender } from '../types';

// } from '../types';
/* eslint-enable */

/* ----- HELPER FUNCTIONS ----- */

export function importZustandStore(): string {
  return `import useStore from '<ADD STORE FILEPATH>';`;
}

export function testInitialState(initialRender: InitialRender): string {
  return Object.entries(initialRender).reduce((acc, [k, v]) => {
    return acc + `\tit('${k} should initialize correctly', () => {\n\t\texpect(result.current.${k}).toStrictEqual(${JSON.stringify(v)});\n\t});\n\n`
  }, '')
}

export function testStateChangesAct(transactions: Transaction<any>[]): string {
  let groupedTransactions: Transaction<any>[][] = [...transactions, { action: 'DUMMY_END_OF_LIST', changedValues: {} }].reduce((acc: { groups: Transaction<any>[][], currentGroup: Transaction<any>[], changedValues: { [nameOfChangedValue: string]: any } }, cur) => {
    if (Object.keys(cur.changedValues).some(v => acc.changedValues[v]) || cur.action === 'DUMMY_END_OF_LIST') {
      acc.groups.push(acc.currentGroup);
      acc.currentGroup = [cur];
      acc.changedValues = Object.keys(cur.changedValues).reduce((acc, k) => {
        acc[k] = true;
        return acc;
      }, {});
    } else {
      acc.currentGroup.push(cur);
      Object.keys(cur.changedValues).forEach(k => acc.changedValues[k] = true);
    }
    return acc;
  }, { groups: [], currentGroup: [], changedValues: {} }).groups;


  return groupedTransactions.reduce((acc, group) => {
    const { str, actBlock } = generateItBlock(group);
    acc.str += str;
    acc.actStatements = actBlock;
    return acc;
  }, { str: '', actStatements: '' }).str;

}
export function testStateChangesExpect([propertyName, newValue]: [string, any]): string {
  return `\nexpect(result.current.${propertyName}).toStrictEqual(${JSON.stringify(newValue)});`;
};

export function generateActLine<T extends any[]>(t: Transaction<T>): string {
  const { action } = t;
  const args = t.arguments;
  return `\tresult.current.${action}(${args?.map(arg => JSON.stringify(arg)).join(', ')});\n`
}


function generateItBlock(transactions: Transaction<any>[]): { str: string, actBlock: string } {
  const valuesChanged: string[] = [];
  let expectBlock = '';

  transactions.forEach(t => Object.entries(t.changedValues).forEach(([changedValue, newValue]) => {
    valuesChanged.push(changedValue);
    expectBlock += testStateChangesExpect([changedValue, newValue])
  }));

  let newActBlock = transactions.map(generateActLine).join('');

  return {
    str: `\n\tit('${valuesChanged.join(' & ')} should update correctly', () => {
      const { result } = renderHook(useStore);
  
      act(() => {\n${newActBlock}\n});
  
      ${expectBlock}  
    });`,
    actBlock: newActBlock
  }

}