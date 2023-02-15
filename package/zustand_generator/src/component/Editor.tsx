import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import NumberList from './Numbers';
// import { generateTests } from './component-utils';

const editorStyle: React.CSSProperties = {
  display: 'flex',
  height: '100hv',
  overflow: 'hidden',
  borderLeft: '1px solid rgba(243,246,248,.1)',
};

interface Props {
  code: string;
}

const Editorfield = ({ code }: Props): JSX.Element => {
  // const [storeMap] = React.useState<Map<string, string>>(new Map());
  const [, setInnerCode] = React.useState(code);
  let breakLine = 0;

  for (let curr = 0; curr < code.length; curr++) {
    if (code[curr] == '\n') breakLine++;
  }

  console.log(breakLine);

  return (
    <div style={editorStyle}>
      <NumberList number={breakLine + 10} />
      <CodeEditor
        data-color-mode="dark"
        value={code}
        language="js"
        placeholder="Please enter JS code."
        onChange={(evn) => setInnerCode(evn.target.value)}
        padding={15}
        style={{
          minWidth: 680,
          width: '25wv',
          fontSize: 12,
          backgroundColor: '#1c1c1c',
          fontFamily:
            'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo,monospace',
        }}
      />
      {/* <button onClick={() => console.log(generateTests(storeMap)[0])}>Click me</button> */}
    </div>
  );
};

export default Editorfield;
