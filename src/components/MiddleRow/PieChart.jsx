import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {
  const state = {
    labels: props.resolverStats.map((elt) => elt.name),
    datasets: [
      {
        label: 'Resolvers',
        backgroundColor: ['#1167b1', '#40e0d0', '#187bcd', '#2a9df4'],
        hoverBackgroundColor: ['#187bcd', '#2a9df4', '#1167b1', '#d0efff'],
        data: props.resolverStats.map((elt) => elt.value),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    legend: {
      display: true,
      position: 'bottom',
      padding: 0,
      align: 'center',
      labels: {
        boxWidth: 10,
        fontColor: 'lightgrey',
      },
    },
  };
  return (
    <div className='PieChart'>
      <div className='PieCanvasDiv'>
        <Pie data={state} options={options} height={180} />
      </div>
    </div>
  );
};

export default PieChart;

// const Slice = (props) => {
//   let { pie } = props;
//   let arc = d3.arc().innerRadius(0).outerRadius(100);

//   let interpolate = d3.interpolateRgb('#eaaf79', '#bc3358');

//   return pie.map((slice, index) => {
//     let sliceColor = interpolate(index / (pie.length - 1));

//     return <path d={arc(slice)} fill={sliceColor} />;
//   });
// };

// export const PieChart = (props) => {
//   console.log('props.resolverStats:', props.resolverStats);
//   let data = props.resolverStats.map((elt) => elt.value);
//   let pie = d3.pie()(data);

//   return (
//     <svg height={props.height} width={props.width}>
//       <g transform={`translate(${props.width / 2}, ${props.height / 2})`}>
//         <Slice pie={pie} />
//       </g>
//     </svg>
//   );
// };

//-----------------FIRST-----------------//

// const PieChart = (props) => {

//   let uselessData = [{name:'fds', value: 100}, {name:'fds', value: 150}];
//   const moreuseless = [1,2,3,4]
//   let dumData = props.dummyData.resolverStats.map(elt => elt);
//   console.log(dumData);

//   const ref = useRef();

//   const createPie = d3
//     .pie()
//     .value((d) => d.value)
//     .sort(null);
//   const createArc = d3
//     .arc()
//     .innerRadius(props.innerRadius)
//     .outerRadius(props.outerRadius);
//   const colors = d3.interpolateBlues;

//   useEffect(() => {

//     const data = createPie(dumData);

//     const group = d3.select(ref.current);
//     const groupWithData = group.selectAll('g.arc').data(data);

//     groupWithData
//       .enter()
//       .append('g')
//       .attr('class', 'arc');

//     const path = groupWithData
//       .append('path')
//       .merge(groupWithData.select('path.arc'));

//     path
//       .attr('class', 'arc')
//       .attr('d', createArc)
//       .attr('fill', (d, i) => colors(i/(props.resolverStats.length)));

//     const text = groupWithData
//       .append('text')
//       .merge(groupWithData.select('text'));

//     text
//       .attr('text-anchor', 'middle')
//       .attr('alignment-baseline', 'middle')
//       .attr('transform', (d) => `translate(${createArc.centroid(d)})`)
//       .style('fill', 'black')
//       .style('font-size', '10')
//       .style('font-family', 'Arial')
//       .style('text-align', 'middle')
//       //.text((d) => d.data.name);
//   }, []);

//   return (
//     <svg id="PieChart" width={props.width} height={props.height}>
//       <g
//         ref={ref}
//         transform={`translate(${props.outerRadius} ${props.outerRadius})`}
//       />
//     </svg>
//   );
// };
