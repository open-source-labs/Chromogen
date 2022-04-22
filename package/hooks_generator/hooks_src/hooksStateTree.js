import React, { userRef, useEffect } from 'react';
import { select, hierarchy } from 'd3';
import HooksChromogenObserver from '../hooks_src/component/HooksChromogenObserver';

function TreeChart({ data }){
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = HooksChromogenObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const root = hierarchy(data);
    console.log(data);
    console.log(root);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default TreeChart;