import React from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
import Checkbox from '@mui/material/Checkbox';
// import { allCompleteState, filteredListContentState } from '../store/store';
import shallow from 'zustand/shallow';
import useToDoStore from '../store/store';
import { useEffect } from 'react';

const selector = (state) => ({
  setAllComplete: state.setAllComplete,
  checkBox: state.checkBox,
  setCheckBox: state.setCheckBox
});

const TodoQuickCheck = () => {
  const { setAllComplete, checkBox, setCheckBox } = useToDoStore(selector, shallow);

  // useEffect(() => setCheckBox());

  return (
    <div id="quickCheck">
      <Checkbox
        disableRipple
        checked={checkBox}
        color="default"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        onClick={() => setAllComplete()}
      />
      All
    </div>
  );
};

export default TodoQuickCheck;
