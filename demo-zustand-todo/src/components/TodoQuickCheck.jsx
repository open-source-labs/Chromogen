import React from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
import Checkbox from '@mui/material/Checkbox';
// import { allCompleteState, filteredListContentState } from '../store/store';
import { useToDoStore } from '../store/store';

const TodoQuickCheck = () => {
  // const [allComplete, setAllComplete] = useRecoilState(allCompleteState);
  // const display = useRecoilValue(filteredListContentState);

  return (
    <div id="quickCheck">
      <Checkbox
        disableRipple
        checked={true}
        color="default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        onChange={() => console.log('hi')}
      />
      all
    </div>
  );
};

export default TodoQuickCheck;
