import React, { useState } from 'react';

function Dataset() {
  const [selectedName, setSelectedName] = useState('none');
  const onClick = (e) => {
    // console.log(e.currentTarget.dataset.name);
    // console.log(e.target.dataset.name);
    const name = e.target.dataset.name;
    setSelectedName(name);
  };
  return (
    <>
      <button onClick={onClick} data-name='Hwang'>
        Hwang
      </button>
      <button onClick={onClick} data-name='Kim'>
        Kim
      </button>
      <button onClick={onClick} data-name='Jo'>
        Jo
      </button>
      <button onClick={onClick} data-name='Sim'>
        Sim
      </button>
      <button onClick={onClick} data-name='Lee'>
        Lee
      </button>
      <button onClick={onClick} data-name='Jang'>
        Jang
      </button>
      <p>
        selecteName is <strong>{selectedName}</strong>
      </p>
    </>
  );
}

export default Dataset;
