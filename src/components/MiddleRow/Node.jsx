import React, { useRef, useEffect, useState } from 'react';
import { select, forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3';

function Node() {

  const svgRef = useRef();

  // const [newData, setNewData] = useState({
  //   nodes: [
  //     {"name": "Caql"},
  //     {"name": "Aql"},
  //     {"name": "Raql"},
  //     {"name": "Jaql"},
  //     {"name": "Maql"},
  //     {"name": "Craql"}
  //   ],
  //   links: [
  //     {"src": "Caql", "trg": "Jaql"},
  //     {"src": "Craql", "trg": "Maql"},
  //     {"src": "Maql", "trg": "Jaql"},
  //     {"src": "Raql", "trg": "Caql"},
  //     {"src": "Caql", "trg": "Aql"}
  //   ]
  // });

  const [newNodes, setNewNodes] = useState([
    {"name": "Caql"},
    {"name": "Aql"},
    {"name": "Raql"},
    {"name": "Jaql"},
    {"name": "Maql"},
    {"name": "Craql"}
  ]);

  const [newLinks, setNewLinks] = useState([
    {"source": "Aql", "target": "Caql"},
    {"source": "Aql", "target": "Jaql"},
    {"source": "Aql", "target": "Maql"},
    {"source": "Aql", "target": "Raql"},
    {"source": "Aql", "target": "Craql"}
  ]);

  useEffect(() => {

    const svg = select(svgRef.current);

    let link = svg.selectAll("line")
      .data(newLinks)
      .enter()
      .append("line")
      .attr("stroke-width", 1)
      .style("stroke", "white");
   
    let node = svg.selectAll("circle")
      .data(newNodes)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", "teal");

    let simulation = forceSimulation()
      .force("link", forceLink().id((d) => d.name))
      .force("charge", forceManyBody())
      .force("center", forceCenter(100, 100));

    simulation
      .nodes(newNodes)
      .on("tick", ticked);

    simulation.force("link").links(newLinks);        

    function ticked() {
      link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
  
      node
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y);
    }

  }, [newNodes, newLinks]);



  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Node;
