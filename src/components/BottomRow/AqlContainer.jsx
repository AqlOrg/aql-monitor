import React from 'react';
import AqlRow from './AqlRow.jsx';

function AqlContainer(props) {
  const aqlRows = [];
  for (let el of props.data) {
    aqlRows.push(<AqlRow data={el} key={el.id} />);
  }
  return <div className="aql-container">{aqlRows}</div>;
}

export default AqlContainer;
