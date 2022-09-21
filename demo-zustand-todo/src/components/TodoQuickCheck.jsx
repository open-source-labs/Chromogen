import React from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
import Checkbox from '@mui/material/Checkbox';
// import { allCompleteState, filteredListContentState } from '../store/store';
import shallow from 'zustand/shallow';
import { useToDoStore } from '../store/store';

const selector = (state) => ({
  setAllComplete : state.setAllComplete
});

const TodoQuickCheck = () => {
  const { setAllComplete } = useToDoStore(selector, shallow);

  return (
    <div id="quickCheck">
      <Checkbox
        disableRipple
        checked={true}
        color="default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        onClick={() => setAllComplete()}
      />
      All
    </div>
  );
};

export default TodoQuickCheck;
