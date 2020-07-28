const Footer = () => {
  return (
    <div>
      <p>여기는 푸터</p>
      <style jsx>
        {`
          p {
            background-color: brown;
            position: fixed;
            bottom: 0;
            display: flex;
            justify-contents: center;
            item-align: center;
            padding: 20px;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};
export default Footer;
