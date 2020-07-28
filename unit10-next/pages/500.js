import { commonAdd } from '../src/util';

const ServerError500 = () => {
  commonAdd();
  return (
    <div>
      <p>SERVER ERROR</p>
    </div>
  );
};

export default ServerError500;
