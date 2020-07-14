import React, { useState, useEffect } from 'react';

function App() {
  const [objA, setObjA] = useState({ firstName: '이름', lastName: '성' });
  const [objB, setObjB] = useState({ firstName: '___ ', lastName: '___' });
  useEffect(() => {}, [objA, objB]);
  return (
    <>
      <div>
        <h1>useState(객체) 사용하기</h1>
        <h2>잘못된 사용</h2>
        <input onChange={(e) => setObjA({ firstName: e.target.value })} />
        <input onChange={(e) => setObjA({ lastName: e.target.value })} />
        <div>
          <span>{objA.firstName}-</span>
          <span>{objA.lastName}</span>
        </div>
      </div>
      <div>
        <h2>잘된 사용</h2>
        <input
          onChange={(e) => setObjB({ ...objB, firstName: e.target.value })}
        />
        <input
          onChange={(e) => setObjB({ ...objB, lastName: e.target.value })}
        />

        <div>
          <span>{objB.firstName}-</span>
          <span>{objB.lastName}</span>
        </div>
      </div>
    </>
  );
}

export default App;
