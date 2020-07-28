import { callApi } from '../src/api';
import { commonAdd } from '../src/util';

const Page3 = ({ text, data, userAgent }) => {
  commonAdd();
  return (
    <div>
      <p>page3입네당</p>

      {text && <p>{text}</p>}
      {data && <p>{data}</p>}
      {userAgent && <p>{userAgent}</p>}
    </div>
  );
};
export default Page3;

Page3.getInitialProps = async (context) => {
  console.log({ context });
  console.log('page3-서버패칭 실행');

  if (context) {
    console.log('page3-콘텍스트 OOOO');
    const { err, req, res, pathname, query, asPath, AppTree } = context;
    // context : err,req,res,pathname,query,asPath,AppTree
    // 주소에 쿼리파라미터 키=text, 값으로 입력한 값이 등록됨. 없으면 none
    // 예 : localhost:3000/page3?text=이것이가쿼리파라미터야!
    const text = query.text || 'none';
    const data = await callApi();
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

    return { text, data, userAgent };
  } else {
    console.log('page3-콘텍스트 XXXX');
    return { data };
  }
};
