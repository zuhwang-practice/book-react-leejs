import produce from 'immer';

// 액션 객채의 타입 지정
interface TypedAction<T extends string> {
  type: T;
}

// 액션 객채의 타입 지정
interface TypedPayloadAction<T extends string, P> extends TypedAction<T> {
  payload: P;
}

// 액션생성자 함수의 타입
export function createAction<T extends string>(type: T): TypedAction<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P,
): TypedPayloadAction<T, P>;
// @ts-ignore
export function createAction(type, payload?) {
  return payload !== undefined ? { type, payload } : { type };
}

// 리듀서 생성하는 함수의 타입, S=state, A= 모는 액션객체의 유니온타입
export function createReducer<S, A extends TypedAction<string>>(
  // 초기상태값 매개변수
  initialState: S,
  // 모든 액션처리함수가 담긴 객체
  handlerMap: {
    // 각 객체가 갖는 payload를 알수있는 타입지정
    [key in A['type']]: (
      state: S,
      action: Extract<A, TypedAction<key>>,
    ) => void;
  },
) {
  return function (state: S = initialState, action: A) {
    return produce(state, (draft) => {
      // 이머사용해서 상태값 다루기
      // @ts-ignore
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
}
