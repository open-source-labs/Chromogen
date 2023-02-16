import React, { useState } from 'react';
import RecordButton from './notButtons/RecordButton';
import StartButton from './notButtons/StartButton';

const Button = () => {
  const [isRecording, setIsRecording] = useState(true);
  const handleClick = () => setIsRecording(!isRecording)


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '20px' }}>
      {isRecording ? (
        <RecordButton handleClick={handleClick} />
      ) : (
        <StartButton handleClick={handleClick} />
      )}
    </div>
  );

}

export default Button;