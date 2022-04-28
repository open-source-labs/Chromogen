import React, { useState, useEffect } from 'react';
import TreeChart from '../d3stateTree';

const StateTree: React.FC<{ state: object }> = ({state}) => {

  return (
    <React.Fragment>
      <div id="stateTree">
        <div id ="label">State Tree</div>
        <div id="stateBox">
          <TreeChart state={state} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default StateTree;
