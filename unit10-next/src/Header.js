import Link from 'next/link';

const Header = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href='/' passHref>
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href='/about' passHref>
              <a>about</a>
            </Link>
          </li>
          <li>
            <Link href='/page3' passHref>
              <a>page3</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          nav {
            background-color: beige;
            padding: 20px;
          }
          ul {
            display: flex;
            justify-contents: center;
            align-items: center;
            list-style: none;
          }
          li {
          }
          a {
            padding: 10px 30px;
            color: black;
            font-weight: 900;
            margin: 10px;
            text-decoration: none;
          }
          a:hover {
            border-bottom: 1px solid black;
          }
        `}
      </style>
    </div>
  );
};
export default Header;
