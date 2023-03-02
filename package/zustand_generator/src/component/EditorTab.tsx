import React from 'react';
import SecondaryButton from './Buttons/SecondaryButton';

type Props = {
  setIsHidden: Function;
  isHidden: boolean;
};

const EditorTab = (props: Props): JSX.Element => {
  const { isHidden, setIsHidden } = props;
  return (
    <div style={{ position: 'absolute', top: '8px', right: '16px' }}>
      <SecondaryButton value="Chromogen" icon="expand" handleClick={() => setIsHidden(!isHidden)} />
    </div>
  );
};

export default EditorTab;
