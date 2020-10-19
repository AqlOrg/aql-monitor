import React, { useState } from 'react';
import AqlContainer from './AqlContainer.jsx';
import { CgAdd, CgCloseO } from 'react-icons/cg'
import { useSpring, animated } from 'react-spring'


function MutationRow(props) {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };
  const dateTime = new Date(parseInt(props.data.dateTime));

  // const toggleStyle = useSpring({

  // })
  const aqlContainerStyle = useSpring({
    height: expanded ? '100vh' : '0vh',
    width: '100%'
  })

  return (
    <div className='mutation-row'>
      <div className='mutation-data'>
        <div>{dateTime.toLocaleDateString()}</div>
        <div>{dateTime.toLocaleTimeString()}</div>
        <div className={'wide-data'}>{props.data.mutationId}</div>
        <div>{props.data.resolver}</div>
        <div>{props.data.expectedAqls}</div>
        <div>{props.data.avgLatency}</div>
        <button onClick={handleClick}>{expanded ? <CgCloseO style={{ marginTop: '6px', }}></CgCloseO> : <CgAdd style={{ marginTop: '6px' }}></CgAdd>}</button>
      </div>
      <animated.div style={aqlContainerStyle}>
        <AqlContainer data={props.data.aqls} />
      </animated.div>
    </div>
  );
}

export default MutationRow;
