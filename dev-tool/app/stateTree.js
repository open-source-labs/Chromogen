import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';




const TreeChart: React.FC = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = HooksChromogenObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const root = hierarchy(data);
    const treeLayout = tree().size([dimensions.height, dimensions.width]);
    treeLayout(root);

    console.log(root.descendants()); // -> root.descendants are all the nodes of the tree
    console.log(root.links()); // -> all lines that link parent nodes to their children

    const linkGenerator = linkHorizontal()
      // .source(link => link.source) // -> default, so do not need to define them
      // .target(link => link.target) // -> likewise, default
      .x(node => node.x)
      .y(node => node.y);

    // nodes
    svg
      .selectAll('.node') // -> class name of nodes
      .data(root.descendants())
      .join('circle')
      .attr('class', 'node')
      .attr('r', 4)
      .attr('fill', 'black')
      .attr('cx', node => node.y)
      .attr('cy', node => node.x)
      // animation following
      .attr('opacity', 0) // -> initial opacity is 0
      .transition()
      .duration(500)
      .delay(node => node.depth * 500) // -> ensures that animation will start from each source node of linkObj, from parent to children
      .attr('opacity', 1)

    // links
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
      .join('text')
      .attr('class', 'label')
      .text(node => node.data.name)
      .attr('text-anchor', 'middle')
      .attr('font-size', 24)
      .attr('x', node => node.y)
      .attr('y', node => node.x=10)
      // animation following
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay(node => node.depth * 500) // -> ensures that animation will start from each source node of linkObj, from parent to children
      .attr('opacity', 1)

  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default TreeChart;