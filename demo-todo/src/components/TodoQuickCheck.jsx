import React from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
import Checkbox from '@mui/material/Checkbox';
import { allCompleteState, filteredListContentState } from '../store/store';

const TodoQuickCheck = () => {
  const [allComplete, setAllComplete] = useRecoilState(allCompleteState);
  const display = useRecoilValue(filteredListContentState);

  return (
    display && (
      <div id="quickCheck">
        <Checkbox
          disableRipple
          checked={allComplete}
          color="default"
          inputProps={{ 'aria-label': 'primary checkbox' }}
          onChange={() => setAllComplete(!allComplete)}
        />
        all
      </div>
    )
  );
};

export default TodoQuickCheck;
