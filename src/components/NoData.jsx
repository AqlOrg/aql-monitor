import React, { useState, useEffect } from 'react';

function NoData(props) {



  return(
    <div className="nodata">
      <div>Looks like there's nothing here, sorry. <br/>Maybe you'd like to take a look at the read me or get yourself a user token.</div>
      <div className="nodatabutton"><a href="#">ReadMe</a></div>
      <div className="nodatabutton" onClick={() => alert(props.userToken)}><a href="#">Get Your User Token</a></div>
    </div> 
  )
}

export default NoData;