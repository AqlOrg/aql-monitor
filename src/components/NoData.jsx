import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NoData(props) {

  return(
    <div className="nodata">
      <div>Looks like there's nothing here, sorry. <br/>Maybe you'd like to take a look at the read me or get yourself a user token.</div>
      <Link to="/readme"><button className="nodatabutton">ReadMe</button></Link>
      <button className="nodatabutton" onClick={() => alert(props.userToken)}>Get Your User Token</button>
    </div> 
  )
}

export default NoData;