import React, { useState, useEffect } from 'react';
import TreeChart from '../d3stateTree';

const StateTree: React.FC<{ state: object }> = ({state}) => {
  // const StateTree: React.FC<{ state: object }> = () => {


  return (
    <React.Fragment>
      <div id="stateTree">
        <div id ="label">State Tree</div>
        <div id="stateBox">
          <TreeChart state={state} />
          {/* Hello it's me, is the TreeChart working */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default StateTree;
