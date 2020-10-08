import React from 'react';

function AqlRow(props) {
  const localDateTime = new Date(parseInt(props.data.subscriber_received_time));
  return (
    <div className="aql-row">
      <div>
        {localDateTime.toLocaleTimeString()} {localDateTime.getMilliseconds()}{' '}
        ms
      </div>
      <div>{props.data.id}</div>
      <div>{props.data.resolver}</div>
      <div>{props.data.expected_subscribers}</div>
      <div>{props.data.latency}</div>
    </div>
  );
}

export default AqlRow;
