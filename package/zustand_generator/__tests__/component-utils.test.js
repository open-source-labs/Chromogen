import { ledger } from '../src/utils/ledger.ts';
import {generateFile} from '../src/component/component-utils';

// Testing generateFile
xdescribe('generateFile', () => {
  const setFile = 0;
  const array = [[], [], []];
  let storeMap = new Map(array);

  const {
    atoms,
    selectors,
    setters,
    atomFamilies,
    selectorFamilies,
    initialRender,
    initialRenderFamilies,
    transactions,
    setTransactions,
  } = ledger;

  // We expect our generate file to not be the falsy return statement, which is the entirety of the ledger, with atoms being the new user input
  generateFile(setFile, storeMap);
});
