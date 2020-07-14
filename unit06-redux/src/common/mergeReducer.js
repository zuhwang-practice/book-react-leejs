export default function mergeReducer(reducers) {
  // reducers = [returnReducer, newReducer]
  // 리듀서 반환
  return function (state, action) {
    if (!state) {
      // 초기 상태값을 계산할때 모든 리듀서 함수의 결과값을 합침
      return reducers.reduce((acc, r) => ({ ...acc, ...r(state, action) }), {});
    } else {
      // 초기화 단계가 아니라면 입력된 모든 리듀서를 호출 -> 다음 상태값 반환
      let nextState = state;
      for (const r of reducers) {
        nextState = r(nextState, action);
      }
      return nextState;
    }
  };
}
