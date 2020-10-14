import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { styled } from '@material-ui/core/styles';
import { styles } from './component-utils';


const MyFiberManualRecordIcon = styled(FiberManualRecordIcon)({
  height: 14,
  color: 'red',
  // position: 'fixed',
  // animation: '${keyFrameRecord} 2s ease-in-out 0s infinite'
});

const Record: React.FC = () => {
  return(
    <span id="record-icon" style={styles.recordStyle}>
      <MyFiberManualRecordIcon/>
      Recording
    </span>
  )
};

export default Record;