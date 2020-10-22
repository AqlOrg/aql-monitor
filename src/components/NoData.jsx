import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CgCloseO } from 'react-icons/cg';

function NoData(props) {

  const [isTokenDisplayed, setIsTokenDisplayed] = useState(false);
  const handleTokenDisplay = () => setIsTokenDisplayed(!isTokenDisplayed);

  return(
    <div className="nodata">
      <div>Looks like there's nothing here, sorry. <br/>Maybe you'd like to take a look at the read me, update your date range, or get yourself a user token.</div>
      <a href="https://www.npmjs.com/package/@aqls/server"><button className="nodatabutton">ReadMe</button></a>
      <button className="nodatabutton" onClick={handleTokenDisplay}>Get Your User Token</button>
      <div className={`token-display ${isTokenDisplayed ? 'active' : 'inactive'}`}>{props.userToken}    <CgCloseO size={18} onClick={()=>setIsTokenDisplayed(false)}/></div>
    </div> 
  )
}

export default NoData;