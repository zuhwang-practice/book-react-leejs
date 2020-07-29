import { add } from '../src/util';

export default () => {
  const data = add(2, 5);
  return (
    <div>
      <h1>메인페이지 data : {data}</h1>
    </div>
  );
};
