import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import NumberList from './Numbers';

const editorStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#0F0F10',
};

const toolBar: React.CSSProperties = {
  height: '100px',
}

const butt: React.CSSProperties = {
  display: 'flex',
  border: '1px solid blue',
  flexGrow: 1,
  overflow: 'auto',
  height: 'calc(100vh - 200px)',
}

const Editorfield = (): JSX.Element => {
  const [code /* setCode */] = React.useState(`function add(a, b) {\n  return a + b;\n}`);

  return (
    <div style={editorStyle}>
      <div style={toolBar}/>
      <div style={butt}>
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
      <div style={toolBar}/>
    </div>
  );
};

export default Editorfield;
