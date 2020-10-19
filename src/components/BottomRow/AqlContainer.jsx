import React from 'react';
import AqlRow from './AqlRow.jsx';
import AqlRowHeader from './AqlRowHeader.jsx';
import { animated, useSpring } from 'react-spring';

function AqlContainer(props) {
  const aqlContainerStyle = useSpring({
    height: props.expanded ? '100px' : '0vh',
    opacity: props.expanded ? 1 : 0,
  });

  const aqlRows = [];
  for (let el of props.data) {
    aqlRows.push(<AqlRow data={el} key={el.id} />);
  }
  return (
    <animated.div className='aql-container' style={aqlContainerStyle}>
      <AqlRowHeader />
      {aqlRows}
    </animated.div>
  );
}

export default AqlContainer;
