import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = (props) => {

  let uselessData = [{name:'fds', value: 100}, {name:'fds', value: 150}];
  const moreuseless = [1,2,3,4]
  let dumData = props.dummyData.resolverStats.map(elt => elt);
  console.log(dumData);

  const ref = useRef();

  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.interpolateBlues;

  useEffect(() => {

    const data = createPie(dumData);

    const group = d3.select(ref.current);
    const groupWithData = group.selectAll('g.arc').data(data);

    groupWithData
      .enter()
      .append('g')
      .attr('class', 'arc');

    const path = groupWithData
      .append('path')
      .merge(groupWithData.select('path.arc'));

    path
      .attr('class', 'arc')
      .attr('d', createArc)
      .attr('fill', (d, i) => colors(i/(props.resolverStats.length))); 

    const text = groupWithData
      .append('text')
      .merge(groupWithData.select('text'));

    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', (d) => `translate(${createArc.centroid(d)})`)
      .style('fill', 'black')
      .style('font-size', '10')
      .style('font-family', 'Arial')
      .style('text-align', 'middle')
      //.text((d) => d.data.name);
  }, []);

  return (
    <svg id="PieChart" width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
  );
};

export default PieChart;
