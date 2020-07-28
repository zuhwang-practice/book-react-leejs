import { commonAdd } from '../src/util';
import styled from 'styled-components';

const Index = ({ dynamicImport2 }) => {
  commonAdd();
  const onClickOne = (e) => {
    import(`../src/dynamicImport`).then(({ dynamicImport }) =>
      console.log(dynamicImport()),
    );
  };

  return (
    <div>
      <Title>인덱스입니다</Title>
      <p onClick={onClickOne}>다이나믹 임포트 1</p>
      <p>{dynamicImport2}</p>
    </div>
  );
};

const Title = styled.h1`
  font-weight: 900;
  color: brown;
  text-align: center;
`;

const Button = styled.p`
  padding: 20px;
  margin: 20px;
  background-color: greenyellow;
  font-size: 20px;
`;

Index.getInitialProps = async () => {
  const { dynamicImport2 } = await import('../src/dynamicImport2');
  return {
    dynamicImport2: dynamicImport2(),
  };
};
export default Index;
