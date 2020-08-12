import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { useState } from 'react';
import { selectors, atoms } from './wrapper';

// Provider component used to access state snapshots
export const Provider = () => {
  // Store a copy of previous selector values as state
  const copySelectors = (arr) => arr.map(({ calls, key, newSelector }) => ({calls: {...calls}, key, newSelector}));
  const [selectorState, setSelectorState] = useState(copySelectors(selectors));

  useRecoilTransactionObserver_UNSTABLE(({ snapshot, previousSnapshot }) => {
    // get previous value of each atom
    const previousState = atoms.map(
      (atom) => `${atom.key}: ${JSON.stringify(previousSnapshot.getLoadable(atom).contents)}`,
    );

    // get current value of each atom (after transaction)
    const currentState = atoms.map((atom) => `${atom.key}: ${JSON.stringify(snapshot.getLoadable(atom).contents)}`);

     // FIX: selectors fire AFTER transactionObserver, so count / filter is off-by-one
    const firedSelectors = selectors.filter(
      ({ calls: { count }, key }) => {
        const previous = selectorState.find((el) => key === el.key);
        return previous ? previous.calls.count !== count : false;
      }
    );

    // LOGGING
    console.log('\n' + '** PREVIOUS STATE **');
    previousState.forEach((atomStr) => {console.log(atomStr)});
    console.log('\n' + '** POST-TRANSACTION STATE **');
    currentState.forEach((atomStr) => {console.log(atomStr)});
    console.log('\n' + '** SELECTORS **');
    firedSelectors.forEach(({ calls: { count }, key }) => {console.log(`${key} fired (${count} total calls)`)});
    console.log('---------------');

    // update component local state with new copy of selectors array
    setSelectorState(copySelectors(selectors));
  });

  // Nothing renders to DOM
  return null;
};
