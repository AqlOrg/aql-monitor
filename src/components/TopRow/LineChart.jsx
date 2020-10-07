import React, { useRef, useEffect, useState } from 'react';
import {
  select,
  scaleLinear,
  line,
  min,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  zoom,
  zoomTransform,
} from 'd3';
import useResizeObserver from '../useResizeObserver';

/**
 * Component that renders a LineChart
 */

function LineChart(props) {
  const avgLatency = props.mutationData.map(elt => ({avgL: elt.avgLatency, mutDate: elt.dateTime})); 
  const subscribers = props.mutationData.map(elt => elt.expectedAqls);
  const date = props.mutationData.map(elt => elt.dateTime); 
  console.log(avgLatency);                                  
  const mutationStartDate = new Date(date[0]);
  console.log(mutationStartDate);

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [currentZoomState, setCurrentZoomState] = useState();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const svgContent = svg.select('.content');
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // scales + line generator
    const xScale = scaleLinear()
      .domain([min(date), max(date)])
      .range([10, width - 10]);

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      xScale.domain(newXScale.domain());
    }

    const yScale = scaleLinear()
      .domain([0, max(avgLatency)])
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((d) => xScale(d))
      .y((d) => yScale(d))
      .curve(curveCardinal);

    // render the line
    svgContent
      .selectAll('.myLine')
      .data([avgLatency])
      .join('path')
      .attr('class', 'myLine')
      .attr('stroke', 'lightblue')
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    svgContent
      .selectAll('.myDot')
      .data(avgLatency)
      .join('circle')
      .attr('class', 'myDot')
      .attr('stroke', 'lightblue')
      .attr('r', 2)
      .attr('fill', 'lightblue')
      .attr('cx', (value, index) => xScale(index))
      .attr('cy', yScale);

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .style('color', 'white');

    const yAxis = axisLeft(yScale);
    svg.select('.y-axis').style('color', 'white').call(yAxis);

    // zoom
    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', () => {
        const zoomState = zoomTransform(svg.node());
        setCurrentZoomState(zoomState);
      });

    svg.call(zoomBehavior);
  }, [currentZoomState, avgLatency, dimensions]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg className="LineChart" ref={svgRef}>
          <defs>
            <clipPath id="LineChart">
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#LineChart)`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default LineChart;
