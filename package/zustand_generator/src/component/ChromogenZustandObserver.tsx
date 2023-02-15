import Editor from './Editor';
import React from 'react';
import { ledger } from '../utils/ledger';
import { generateTests } from './component-utils';

const panel: React.CSSProperties = {
  display: 'flex',
};

interface Props {
  children: JSX.Element;
}

export const ChromogenZustandObserver: React.FC<Props> = ({ children }): JSX.Element => {
  const [code, setCode] = React.useState('');
  const [storeMap] = React.useState<Map<string, string>>(new Map());

  React.useEffect(() => {
    setCode(String(generateTests(storeMap)));
    console.log(ledger.transactions, ledger.transactions.length);
    // console.log(ledger.transactions[2].changedValues);
  });

  // React.useEffect(() => console.log(ledger.transactions[2].changedValues), []);

  return (
    <div style={panel}>
      {children}
      <Editor code={code} />
    </div>
  );
};
