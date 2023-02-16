import React from 'react';

const listStyle: React.CSSProperties = {
  paddingBlock: '28px',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'flex-end',
  textAlign: 'end',
  background: '#1c1c1c',
  paddingInline: '16px',
  border: '1px solid #1c1c1c',
  height: 'auto',
};

const numberStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#747478',
  fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo,monospace',
};

const unique = (val: number | string) => (
  <p key={'number' + val} style={numberStyle}>
    {val}
  </p>
);

const numerous = (number = 1000) => {
  let pointer: number = 1;
  let allNumbers: JSX.Element[] = [];
  while (pointer < number) {
    allNumbers = [...allNumbers, unique(pointer)];
    pointer++;
  }

  return allNumbers;
};

const NumberList = ({ number }): JSX.Element => <div style={listStyle}>{numerous(number)}</div>;

export default NumberList;
