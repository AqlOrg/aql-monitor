import React, { useRef, useEffect, useState } from 'react';

/**
 * Component that renders a Log Entry
 */

function LogHeader() {
  return (
    <div id='log-header'>
      <div>Date</div>
      <div>Time</div>
      <div>ID</div>
      <div>Resolver</div>
      <div>Total Subscribers</div>
      <div>Average Latency</div>
      <div>Details</div>
    </div>
  );
}

export default LogHeader;
