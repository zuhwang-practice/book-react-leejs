import { ActionType, actions } from './action';
import { createReducer } from '../../common/redux';

// 인터페이스로 상태값으 타입 정의
export interface StatePerson {
  name: string;
  age: number;
}

// 초기상태값 정의
const INITIAL_STATE = {
  name: 'empty',
  age: 0,
};

// ReturnType내장타입을 이용해 액션객체의 모든 타입을 유니온타입으로 만듬
type Action = ReturnType<typeof actions[keyof typeof actions]>;
//  createReducer함수로 리듀서 생성
export default createReducer<StatePerson, Action>(INITIAL_STATE, {
  [ActionType.SetName]: (state, action) => (state.name = action.payload.name),
  [ActionType.SetAge]: (state, action) => (state.age = action.payload.age),
});
