import React, { useState, useEffect } from 'react';

const StateTree: React.FC<{ state: object }> = ({state}) => {
 return (
    <div id="stateTree">
      <div id ="label">State Tree</div>
      <div id="stateBox"></div>
    </div>
 );
}

export default StateTree;