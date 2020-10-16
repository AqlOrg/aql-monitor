import React, { useRef, useEffect, useState } from 'react';

/**
 * Component that renders a Log Entry
 */

function LogHeader() {
  return (
    <div id='log-header'>
      <div>Date</div>
      <div>Time</div>
      <div className={'wide-data'}>ID</div>
      <div>Resolver</div>
      <div>Subscribers</div>
      <div>Latency</div>
      <div className={'spacer'}></div>
    </div>
  );
}

export default LogHeader;
