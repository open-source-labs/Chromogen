import React from 'react';

const listStyle: React.CSSProperties = {
  paddingBlock: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'flex-end',
  textAlign: 'end',
  background: 'white',
  paddingInline: '16px',
  border: '1px solid white',
  height: 'auto',
  maxWidth: '45px',
};

const numberStyle: React.CSSProperties = {
  fontSize: 12,
  color: 'rgba(162, 162, 162, 0.7)',
  fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo,monospace',
};

const unique = (val: number) => <p style={numberStyle}>{val}</p>;

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
