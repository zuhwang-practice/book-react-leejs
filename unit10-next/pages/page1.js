import Head from 'next/head';
import { commonAdd } from '../src/util';

const Page1 = () => {
  commonAdd();
  return (
    <div>
      <p>Page1</p>
      <img src='/static/c.png' width='300px'></img>
      <Head>
        <title>만나서반가워영</title>
      </Head>
      <Head>
        <meta name='description' content='hello world' />
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

export default Page1;
