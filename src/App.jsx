import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
// COMPONENT IMPORTS
import NavBar from './components/NavBar.jsx';
import DashboardContainer from './components/DashboardContainer.jsx';
import Footer from './components/Footer.jsx';
// SCSS
import '../public/scss/application.scss';

function App() {
  let [ready, setReady] = useState(false);
  let [aqlData, setAqlData] = useState({});

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setAqlData(data))
      .then(() => setReady(true))
      .catch((err) => console.log(err));
  }, []);
  console.log(aqlData);
  return (
    <div className='App'>
      <NavBar />
      {ready && (
        <DashboardContainer
          data={aqlData}
          mutationData={aqlData.mutations}
          resolverStats={aqlData.resolverStats}
        />
      )}
      <Footer></Footer>
    </div>
  );
}
export default App;
