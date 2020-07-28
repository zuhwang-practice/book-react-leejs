import { commonAdd } from '../src/util';

const Index = ({ dynamicImport2 }) => {
  commonAdd();
  const onClickOne = (e) => {
    import(`../src/dynamicImport`).then(({ dynamicImport }) =>
      console.log(dynamicImport()),
    );
  };

  return (
    <div>
      <h1>인덱스입니다</h1>
      <p onClick={onClickOne}>다이나믹 임포트 1</p>
      <p>{dynamicImport2}</p>
      <style jsx>
        {`
          p {
            background-color: greenyellow;
            padding: 10px;
            cursor: pointer;
          }
          p:last-child {
            background-color: skyblue;
          }
        `}
      </style>
    </div>
  );
};

Index.getInitialProps = async () => {
  const { dynamicImport2 } = await import('../src/dynamicImport2');
  return {
    dynamicImport2: dynamicImport2(),
  };
};
export default Index;
