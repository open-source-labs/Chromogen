import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import NumberList from './Numbers';

const editorStyle: React.CSSProperties = {
  display: 'flex',
  border: '1px solid white',
  height: '100hv',
  overflow: 'hidden',
};

const Editorfield = (): JSX.Element => {
  const [code /* setCode */] = React.useState(`function add(a, b) {\n  return a + b;\n}`);

  return (
    <div style={editorStyle}>
      <NumberList number={4} />
      <CodeEditor
        value={code}
        language="js"
        placeholder="Please enter JS code."
        // onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          width: 580,
          fontSize: 12,
          backgroundColor: '#fff',
          fontFamily:
            'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo,monospace',
        }}
      />
    </div>
  );
};

export default Editorfield;
