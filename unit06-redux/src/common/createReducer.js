import produce from 'immer';

export default function createReducer(initState, handlerMap) {
  // handlerMap은 {[액션타입]:(state,acrion)=>{ 로직 }}
  return function (state = initState, action) {
    // immer 적용하기
    return produce(state, (draft) => {
      // handler = (state,acrion)=>{ 로직 }
      const handler = handlerMap[action.type];
      if (handler) {
        // state에 자리에 draft로!
        handler(draft, action);
      }
    });
  };
}
