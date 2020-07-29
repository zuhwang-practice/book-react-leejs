import React from 'react';

// ! 고차 컴포의 타입 지정
// 고차컴포가 추가로 입력받는 속성값 타입
interface Props {
  baseAge: number;
}

// 입력된 컴포넌트에 고차 컴포넌트가 추가로 포함시키는 속성값 타입
export interface InjectedProps {
  age: number;
}

// 입력되는 컴포넌트의 속성값 타입을 제네릭으로 입력받는다
const withAge = function s<ComponentProps extends object>(
  // 입력되는 컴포는 자신의 속성값을 더해 InjectedProps를 추가속성으로 갖음
  Component: React.ComponentType<ComponentProps & InjectedProps>,
) {
  // ComponentProps&Props는 출력되는 컴포의 속성타입
  class wrappedComponent extends React.Component<ComponentProps & Props> {
    render() {
      const { baseAge } = this.props;
      return <Component age={baseAge + 5} />;
    }
  }
  return wrappedComponent;
};

export default withAge;
