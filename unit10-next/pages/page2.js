import Head from 'next/head';
import MyImage from '../static/c.png';
import { commonAdd } from '../src/util';

const Page2 = () => {
  commonAdd();
  return (
    <div>
      <p>Page2</p>
      <p>마 이거시가 정적파일 해싱이라는 거시여</p>
      <img src={MyImage} width='300px'></img>
      <Head>
        <title>정적파일 해시하여 사용하기</title>
      </Head>
      <style jsx>
        {`
          p {
            color: blue;
            font-size: 18pt;
          }
        `}
      </style>
    </div>
  );
};

export default Page2;
