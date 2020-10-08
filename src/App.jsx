import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
// COMPONENT IMPORTS
import NavBar from './components/NavBar.jsx';
import DashboardContainer from './components/DashboardContainer.jsx';
// SCSS
import '../public/scss/application.scss';
// import new dummy data
import dummyData from '../server/sampleDataShape.js';

function App() {
  // CREATE DUMMY DATA
  const generateData = (value, length = 7) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value:
        value === null || value === undefined ? Math.random() * 100 : value,
    }));

  let aqlData;
  
  // const postData = {
  //   method: 'POST',
  //   body: JSON.stringify({}),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // };

  // fetch('/api', postData)
  //   .then(res => res.json())
  //   .then(data => aqlData = data[0])
  //   .catch(err => console.log(err));

  // this is just till our end point is set up
  aqlData = dummyData;
 
  // PIE CHART DATA HOOK
  const [resolverStats, setResolverStats] = useState(aqlData.resolverStats);
  // LINE GRAPH DATA HOOK/ANY MUTATION STUFF
  const [mutationData, setMutationData] = useState(aqlData.mutations);

  // DATA / SETDATA HOOK
  const [data, setData] = useState(generateData(0));

  // SETDATA WITH GENERATE DUMMY DATA UPON STATE CHANGE
  useEffect(() => {
    setData(generateData());
  }, [!data]);

  return (
    <div className="App">
      <NavBar />
      <DashboardContainer
        data={data}
        mutationData={mutationData}
        resolverStats={resolverStats}
      />
    </div>
  );
}

export default App;
