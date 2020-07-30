import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../common/store';
import { actions } from '../state/action';

//  mapStateToProps의 반환타입을 PropsState 타입에 할당
type PropsState = ReturnType<typeof mapStateToProps>;
// mapDispatchToProps의 반환타입을 PropsDispatch 타입에 할당
type PropsDispatch = typeof actions; // actions는 리덕스에서 사용하는 모든 액션생선함수를 묵어서 사용

// 현재 컴포넌트의 Props의 타입 선언
interface Props extends PropsState, PropsDispatch {
  birthday: string;
}

// 클래스의 타입을 인터페이스-제네릭으로 전달
class Person extends React.Component<Props> {
  onClick = () => {
    this.props.setName('mike'); // PropsDispatch 타입이 제공하는 정보가 사용됨
    this.props.setAge(23);
  };
  render() {
    const { name, age, birthday } = this.props;
    return (
      <div>
        <p>{name}</p>
        <p>{age}</p>
        <p>{birthday}</p>
        <button onClick={this.onClick}>정보 추가하기</button>
      </div>
    );
  }
}

// ReduxState는 리덕스에서 관리하는 상태값을 나타내는 타입
export const mapStateToProps = (state: ReduxState) => {
  return {
    name: state.person.name,
    age: state.person.age,
  };
};

export default connect(mapStateToProps, actions)(Person);
