import React, { createRef } from 'react';
import { EventObject } from './types';

// ~ 클래스 컴포넌트 타입지정하기

// Props의 타입지정
interface Props {
  // 리액트에서 돔요소에 입력하는 스타일 객체 타입
  containerStyle: React.CSSProperties;
  theme: string;
}
// props 초기값
const defaultProps = {
  theme: 'dark',
};

// state 타입정의
interface State {
  name: string;
  age: number | undefined;
}

// 제네릭으로 Props와 State타입을 지정한다
class ClassCompo extends React.Component<Props, State> {
  state = {
    name: 'mike',
    age: undefined,
  };

  static defaultProps = defaultProps;
  pRef = createRef<HTMLParagraphElement>();
  handleOnClick1 = (e: EventObject) => {
    console.log(e.currentTarget.dataset['food']);
  };
  handleOnClick2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`${e.clientX} ${e.clientY}`);
  };
  render() {
    const { containerStyle, theme } = this.props;
    const { name, age } = this.state;
    return (
      <div style={containerStyle}>
        <p ref={this.pRef}>{name}</p>
        <p>{`${name} ${age}`}</p>
        <p>{`theme is ${theme}`}</p>
        <button data-food='soup' onClick={this.handleOnClick1}>
          버튼1
        </button>
        <button onClick={this.handleOnClick2}>버튼2</button>
      </div>
    );
  }
}

export default ClassCompo;
