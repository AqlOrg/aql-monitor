import React, { useRef, useEffect, useState } from 'react';

/**
 * Component that renders a Log Entry
 */

function AqlRowHeader() {
  return (
    <div className={'aql-row-header'}>
      <div>Time</div>
      <div className={'wide-data'}>ID</div>
      <div>Resolver</div>
      <div>Subscribers</div>
      <div>Latency</div>
    </div>
  );
}

export default AqlRowHeader;