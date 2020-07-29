// children은 리액ㅌ 요소를 반화하는 함수로 정의
interface Props {
  // React.ReactNode가 더 정확한 타입이지만, 특정보전에서 문제가 있어서 Element씀
  children: (name: string, age: number) => React.ReactElement<any>;
}

const MyCompo: React.FunctionComponent<Props> = function ({ children }) {
  return children('ss', 13);
};

export default MyCompo;
