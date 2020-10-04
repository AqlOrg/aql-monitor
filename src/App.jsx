import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
// COMPONENT IMPORTS
import NavBar from './components/NavBar.jsx';
import DashboardContainer from './components/DashboardContainer.jsx';
// SCSS
import '../public/scss/application.scss';

function App() {
  // CREATE DUMMY DATA
  const generateData = (value, length = 7) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value:
        value === null || value === undefined ? Math.random() * 100 : value,
    }));

  // DATA / SETDATA HOOK
  const [data, setData] = useState(generateData(0));

  // SETDATA WITH GENERATE DUMMY DATA UPON STATE CHANGE
  useEffect(() => {
    setData(generateData());
  }, [!data]);

  return (
    <div className="App">
      <NavBar />
      <DashboardContainer data={data} />
    </div>
  );
}

export default App;
