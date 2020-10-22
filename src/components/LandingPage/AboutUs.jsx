import React, { useState } from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import Case from '../../../public/ourPics/case.jpg';
import Julie from '../../../public/ourPics/julie.jpg';
import Michael from '../../../public/ourPics/michael.jpg';
import Rocio from '../../../public/ourPics/rocio.jpg';

function AboutUs() {

  const [ourInfo, setOurInfo] = useState([
    {name: 'Case Simmons', github: 'casesimmons', linkedin: 'case-simmons', gitlink: 'https://github.com/casesimmons', linkedlink: 'https://www.linkedin.com/in/case-simmons/', image: Case},
    {name: 'Julie Pinchak', github: 'jpinchak', linkedin: 'julie-pinchak', gitlink: 'https://github.com/jpinchak', linkedlink: 'https://www.linkedin.com/in/julie-pinchak/', image: Julie},
    {name: 'Michael O\'Halloran', github: 'LordRegis22', linkedin: 'michael-ohalloran', gitlink: 'https://github.com/LordRegis22', linkedlink: 'https://www.linkedin.com', image: Michael},
    {name: 'Rocio Infante', github: 'Rocio-Infante', linkedin: 'rocio-infante', gitlink: 'https://github.com/Rocio-Infante', linkedlink: 'https://www.linkedin.com/in/rocio-infante', image: Rocio},
  ]);

  let allOfUs = [];
  for(let user of ourInfo) {
    console.log(user);
    allOfUs.push(
      <div className="person">
        <img src={user.image}></img>
        <div>{user.name}</div>
        <a href={user.gitlink}><div><AiFillGithub style={{marginRight:"8px", verticalAlign:"bottom"}} />{user.github}</div></a>
        <a href={user.linkedlink}><div><AiFillLinkedin style={{marginRight:"8px", verticalAlign:"bottom"}} />{user.linkedin}</div></a>
      </div>
    );
  }

  return (
    <div className="containerContent" id="aboutus">
      {allOfUs}
    </div>
  )
}

export default AboutUs;