import Link from 'next/link';
import { useRouter } from 'next/router';
import { commonAdd } from '../src/util';

const Page4 = () => {
  commonAdd();
  const router = useRouter();
  const handleOnClick = (e) => {
    const [_, href] = e.target.href.split('http://localhost:3000');
    e.preventDefault();
    router.push(href);
  };
  return (
    <div>
      <p>next/link API</p>
      <Link href='/about' passHref>
        <a>about</a>
      </Link>
      <Link href='/page1' passHref>
        <a>page1</a>
      </Link>
      <Link href='/page2' passHref>
        <a>page2</a>
      </Link>
      <Link href='/page3' passHref>
        <a>page3</a>
      </Link>
      <p>next/router useRouter Hooks</p>
      <a href='/about' onClick={handleOnClick}>
        라우터 1 : about
      </a>
      <a href='/page2' onClick={handleOnClick}>
        라우터 2 : page2
      </a>
      <style jsx>
        {`
          p {
            color: greenyellow;
            font-size: 18pt;
            font-weight: 900;
          }
          a {
            padding: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default Page4;
