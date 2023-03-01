import React, { useState } from 'react';
import RecordButton from './RecordingVariations/Record';
import StartButton from './RecordingVariations/Start';

const RecordingButton = () => {
  const [isRecording, setIsRecording] = useState(true);
  const handleClick = () => setIsRecording(!isRecording);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '20px',
        width: '100%',
      }}
    >
      {isRecording ? (
        <RecordButton handleClick={handleClick} />
      ) : (
        <StartButton handleClick={handleClick} />
      )}
    </div>
  );
};

export default RecordingButton;
