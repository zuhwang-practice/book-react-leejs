// 404 페이지를 구현한다
import Code403 from './403';
import Code404 from './404';
import Code500 from './500';

const Error = ({ statusCode }) => {
  return (
    <div>
      {statusCode === 403 && <Code403 />}
      {statusCode === 404 && <Code404 />}
      {statusCode === 500 && <Code500 />}
    </div>
  );
};

Error.getInitialProps = (context) => {
  const { err, res } = context;
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};
export default Error;
