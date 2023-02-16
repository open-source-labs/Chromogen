import Editor from './Editor';
import EditorTab from './EditorTab';
import React, {useState} from 'react';
import { ledger } from '../utils/ledger';
import { generateTests } from './component-utils';
import GlobalStyle from '../GlobalStyle';

const panel: React.CSSProperties = {
  display: 'flex',
};

interface Props {
  children: JSX.Element;
}

export const ChromogenZustandObserver: React.FC<Props> = ({ children }): JSX.Element => {
  const [code, setCode] = React.useState('');
  const [storeMap] = React.useState<Map<string, string>>(new Map());
  const [isHidden, setIsHidden] = useState(false);

  const timer = setInterval(() => {
    setCode(String(generateTests(storeMap)));
  }, 2000);

  React.useEffect(() => {
    setCode(String(generateTests(storeMap)));
    console.log(ledger.transactions, ledger.transactions.length);
    timer;
  }, [timer]);

  // React.useEffect(() => console.log(ledger.transactions[2].changedValues), []);

  return (
    <div style={panel}>
      {children}
      {isHidden
        ? <EditorTab setIsHidden={setIsHidden} isHidden={isHidden}/>
        : <Editor code={code} setIsHidden={setIsHidden} isHidden={isHidden}/>
      }
      <GlobalStyle />
    </div>
  );
};
