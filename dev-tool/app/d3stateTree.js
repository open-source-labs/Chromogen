import React, { useRef, useEffect, useState } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';


const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};


function TreeChart({ state }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data/state change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) {
      console.log('d3 tree not rendering');
      return
    };

    // transform hierarchical data/state
    const root = hierarchy(state);
    const treeLayout = tree().size([dimensions.height - 50, dimensions.width - 60 ]); // -> adjusting tree size according to height and width of the dimensions
    console.log('here are dimensions', dimensions, 'height: ', dimensions.height, 'width: ', dimensions.width);

    console.log('hi, I\'m state', state);
    console.log('hi, i\'m root', root); // -> think about how this can be manipulated for dynamic rendering
    console.log(root.descendants()); // -> root.descendants are all the nodes of the tree
    console.log(root.links()); // -> all lines that link parent nodes to their children

    const linkGenerator = linkHorizontal()
      // .source(link => link.source) // -> default, so do not need to define them
      // .target(link => link.target) // -> likewise, default
      .x(link => link.y)
      .y(link => link.x);


    treeLayout(root);
    // console.log('node.data: ', data, 'node.state: ', state)

    // nodes
    svg
      .selectAll('.node') // -> class name of nodes
      .data(root.descendants())
      .join('circle')
      .attr('class', 'node')
      .attr('r', 10) // -> r = radius of circle, originally set to 4
      .attr('fill', 'pink')
      .attr('cx', node => node.y + 15)
      .attr('cy', node => node.x)
      // animation following
      .attr('opacity', 0) // -> initial opacity is 0
      .transition()
      .duration(500)
      .delay(node => node.depth * 500) // -> ensures that animation will start from each source node of linkObj, from parent to children
      .attr('opacity', 1)

    // links (paths)
    svg
      .selectAll('.link') // -> class name of links
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', 'lightblue')
      .attr('d', linkGenerator /*same thing as -> linkObj => linkGenerator(linkObj)*/)
      //animation following; optional
      .attr('stroke-dasharray', function(){
        const length = this.getTotalLength();
        return `${length} ${length}`;
      })
      .attr('stroke-dashoffset', function(){
        const length = this.getTotalLength();
        return length;
      })
      .transition()
      .duration(500)
      .delay(linkObj => linkObj.source.depth * 500) // -> ensures that animation will start from each source node of linkObj, from parent to children
      .attr('stroke-dashoffset', 0)

    // labels
    svg
      .selectAll('.label') // -> class name of labels (state)
      .data(root.descendants())
      // .join(enter => enter.append('text').attr('opacity', 0))
      .join('text')
      .attr('class', 'label')
      .text(node => node.data.name) // -> node.state? -> node.data
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('x', node => node.y + 15)
      .attr('y', node => node.x) // -> make it dynamic
      // animation following
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay(node => node.depth * 500) // -> ensures that animation will start from each source node of linkObj, from parent to children
      .attr('opacity', 1)

  }, [state, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem'}}>
      <svg ref={svgRef} id='svgRef'></svg>
      {/* {JSON.stringify(state)} */}
      Inside d3stateTree
    </div>
  );
}

export default TreeChart;