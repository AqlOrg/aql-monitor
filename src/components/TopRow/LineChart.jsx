import React, { useRef, useEffect, useState } from 'react';
import {
  select,
  scaleLinear,
  scaleTime,
  line,
  min,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  axisRight,
  timeFormat,
  zoom,
  zoomTransform,
} from 'd3';
import useResizeObserver from '../useResizeObserver';

/**
 * Component that renders a LineChart
 */

function LineChart(props) {

  let avgLatency = props.mutationData.map(elt => ({avgL: elt.avgLatency, mutationDate: parseInt(elt.dateTime), subscribers: parseInt(elt.expectedAqls)})); 
  let mutationLatencies = props.mutationData.map(elt => elt.avgLatency);
  let avgSubscribers = props.mutationData.map(elt => parseInt(elt.expectedAqls));
  let mutationDates = props.mutationData.map(elt => parseInt(elt.dateTime));

  mutationDates = mutationDates.slice(250);
  avgLatency = avgLatency.slice(250);
  avgSubscribers = avgSubscribers.slice(250);
  mutationLatencies = mutationLatencies.slice(250);

  // console.log(mutationDates);
  // console.log(avgLatency.slice(0, 50));

  // console.log(mutationDates);

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
    const xScale = scaleTime()
      .domain([min(mutationDates), max(mutationDates)])
      .range([0, width]);

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      xScale.domain(newXScale.domain());
    }

    const yScale = scaleLinear()
      .domain([0, max(mutationLatencies) + 10])
      .range([height - 10, 0]);

    const ySubScale = scaleLinear()
      .domain([0, max(avgSubscribers)])
      .range([height - 10, 0]);

    const latencyLine = line()
      .x(d => xScale(d.mutationDate))
      .y(d => yScale(d.avgL));
      //.curve(curveCardinal);

    const subscriberLine = line()
      .x(d => xScale(d.mutationDate))
      .y(d => ySubScale(d.subscribers));
      //.curve(curveCardinal);

    // render the line
    svgContent
      .append('path')
      .data([avgLatency])
      .attr('class', 'myLine')
      .attr('stroke', 'lightblue')
      .attr('fill', 'none')
      .attr('d', latencyLine);
    
    svgContent
      .append('path')
      .data([avgLatency])
      .attr('class', 'myLine')
      .style('stroke', 'dodgerblue')
      .attr('fill', 'none')
      .attr('d', subscriberLine);

    // svgContent
    //   .selectAll('.myDot')
    //   .data(avgLatency)
    //   .join('circle')
    //   .attr('class', 'myDot')
    //   .attr('stroke', 'lightblue')
    //   .attr('r', 2)
    //   .attr('fill', 'lightblue')
    //   .attr('cx', (d) => xScale(d.mutationDate))
    //   .attr('cy', (d) => yScale(d.avgL)); 

    // axes
    const xAxis = axisBottom(xScale)
      .tickFormat(timeFormat('%Y-%m-%dT%H:%M:%S'));

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .style('color', 'white')
      .selectAll('text')
        .attr("transform", "translate(-10,10)rotate(-45)")
        .style("text-anchor", "end")
        // .style("font-size", 20)


    const yAxis = axisLeft(yScale); 
    svg.select('.y-axis').style('color', 'white').call(yAxis);

    const ySubAxis = axisRight(ySubScale); 
    svg.append('g')
      .style('color', 'white')
      .attr("transform", "translate(700,0)")
      .call(ySubAxis);

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
    
    // Add the labels to x and y-axes 
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -30)
      .text("Average Latency")
      .style("font-family", "Arial")
      .style("font-size", "12px")
      .style("fill", "lightblue");

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", 732)
      .attr("x", -12)
      .text("Number of Subscribers")
      .style("font-family", "Arial")
      .style("font-size", "12px")
      .style("fill", "dodgerblue");

    // svg.append("text")
    //   .attr("text-anchor", "end")
    //   .attr("y", 260)
    //   .attr("x", 210)
    //   .text("Time")
    //   .style("font-family", "Arial")
    //   .style("font-size", "12px")
    //   .style("fill", "white");

    // svg.call(zoomBehavior);
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
