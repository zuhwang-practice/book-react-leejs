import Error from 'next/error';
import { commonAdd } from '../src/util';

const Admin = ({ statusCode }) => {
  commonAdd();
  return statusCode ? (
    <Error statusCode={403} />
  ) : (
    <div>어드민 페이지 입니다</div>
  );
};

Admin.getInitialProps = () => {
  const statusCode = 403;
  return { statusCode };
};
export default Admin;
