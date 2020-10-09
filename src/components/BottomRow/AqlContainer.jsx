import React from 'react';
import AqlRow from './AqlRow.jsx';
import AqlRowHeader from './AqlRowHeader.jsx';

function AqlContainer(props) {
  const aqlRows = [];
  for (let el of props.data) {
    aqlRows.push(<AqlRow data={el} key={el.id} />);
  }
  return <div className="aql-container"><AqlRowHeader />{aqlRows}</div>;
}

export default AqlContainer;
