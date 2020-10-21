import React, { useState } from 'react';
import AqlContainer from '../BottomRow/AqlContainer.jsx';
import { CgAdd, CgCloseO } from 'react-icons/cg';
import { useSpring, animated, interpolate } from 'react-spring';

function ErrorMutationRow(props) {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };
  const dateTime = new Date(parseInt(props.data.dateTime));

  const spring = useSpring({
    x: expanded ? 45 : 0,
    y: expanded ? 1 : 0,
    config: { tension: 800 },
  });

  const AnimatedIcon = animated(CgAdd);

  return (
    <div
      className='error-mutation-row'
      style={{
        color: spring.y.interpolate({
          range: [0, 1],
          output: ['snow', 'turquoise'],
        }),
      }}
    >
      <div className='mutation-data'>
        <div>{dateTime.toLocaleDateString()}</div>
        <div>{dateTime.toLocaleTimeString()}</div>
        <div className={'wide-data'}>{props.data.mutationId}</div>
        <div>{props.data.resolver}</div>
        <div>{props.data.avgLatency}</div>
        <button onClick={handleClick}>
          <AnimatedIcon
            style={{
              transform: spring.x.interpolate((x) => `rotate(${x}deg)`),
              color: spring.y.interpolate({
                range: [0, 1],
                output: ['snow', 'turquoise'],
              }),
            }}
          ></AnimatedIcon>
        </button>
      </div>
      <AqlContainer data={props.data.aqls} expanded={expanded} />
    </div>
  );
}

export default ErrorMutationRow;
