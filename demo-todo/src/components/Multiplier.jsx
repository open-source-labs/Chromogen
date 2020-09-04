import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { myNumberState } from '../store/atoms';
import { myMultipliedState } from '../store/store';

const Multiplier = () => {
  // defaults to 2
  const number = useRecoilValue(myNumberState);

  // defaults to 200
  const [multipliedNumber, setMultipliedNumber] = useRecoilState(myMultipliedState(100));

  const handleInputChange = (e) => {
    setMultipliedNumber(e.target.value);
  };

  return (
    <div>
      Atom Value (Selector / 100): {number}
      <br />
      Selector Value: {multipliedNumber}
      <br />
      New Selector Value: <input className="multiply-box" onChange={handleInputChange} />
    </div>
  );
};

export default Multiplier;
