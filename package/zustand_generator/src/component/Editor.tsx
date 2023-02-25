import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import NumberList from './Numbers';
import { Header } from './Header';
import Button from './Button';

const editorStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'auto',
  borderLeft: '1px solid rgba(243,246,248,.1)',
  backgroundColor: '#1C1C1C',
  width: '50vw',
};
const codePanel: React.CSSProperties = {
  display: 'flex',
  // flexGrow: 1,
  overflowY: 'scroll',
  height: 'calc(100vh - 56px)',
};

interface Props {
  code: string;
  setIsHidden: Function;
  isHidden: boolean;
}
const Editorfield = ({ code, isHidden, setIsHidden }: Props): JSX.Element => {
  // const [storeMap] = React.useState<Map<string, string>>(new Map());
  const [, setInnerCode] = useState(code);
  let breakLine = 0;

  for (let curr = 0; curr < code.length; curr++) {
    if (code[curr] == '\n') breakLine++;
  }

  console.log(breakLine);

  return (
    <div style={editorStyle}>
      <Header isHidden={isHidden} setIsHidden={setIsHidden} />
      <div style={codePanel}>
        <NumberList number={breakLine ? breakLine + 10 : 0} />
        <CodeEditor
          data-color-mode="dark"
          value={code}
          language="js"
          placeholder=""
          onChange={(evn) => setInnerCode(evn.target.value)}
          padding={15}
          style={{
            maxWidth: 1000,
            width: 'calc(100% - 60px)',
            maxHeight: '100vh',
            overflow: 'visible',
            fontSize: 12,
            backgroundColor: '#1c1c1c',
            fontFamily:
              'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo,monospace',
          }}
        />
      </div>
      <Button />
    </div>
  );
};

export default Editorfield;
