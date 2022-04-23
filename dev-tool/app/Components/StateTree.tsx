import React, { useState, useEffect } from 'react';
import TreeChart from '../stateTree';

const StateTree: React.FC<{ state: object }> = () => {
  


  return (
    <React.Fragment>
      <div id="stateTree">
        <div id ="label">State Tree</div>
        <div id="stateBox">
          <TreeChart />
        </div>
      </div>
    </React.Fragment>
  );
}

export default StateTree;