import React from 'react';

const App = ({ name, age }: { name: string; age: number }) => {
  return (
    <div>
      <h1>헬로월도!</h1>
      <p>이름 : {name}</p>
      <p>나이 : {age}</p>
    </div>
  );
};

export default App;
