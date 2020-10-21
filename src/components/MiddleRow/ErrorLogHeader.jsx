import React, { useRef, useEffect, useState } from 'react';

/**
 * Component that renders a Log Entry
 */

function ErrorLogHeader() {
  return (
    <div id='ErrorLogHeader'>
      <div>Date</div>
      <div>Time</div>
      <div className={'wide-data'}>ID</div>
      <div>Resolver</div>
      <div>Latency</div>
      <div className={'spacer'}></div>
    </div>
  );
}

export default ErrorLogHeader;
