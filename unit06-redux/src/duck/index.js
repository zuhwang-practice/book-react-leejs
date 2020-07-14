import { createStore, combineReducers } from 'redux';
export import timelineReducer, {
  addTimeline,
  removeTimeline,
  editTimeline,
  increseNextPage,
} from './timelineDuck';
export import friendRedicer, {
  addFriend,
  removeFriend,
  editFriend,
} from './friendDuck';

const rootReducer = combineReducers({
  timeline: timelineReducer,
  friend: friendRedicer,
});

const store = createStore(rootReducer);

store.subscibe(() => {
  // 디버깅을 위해, 액션처리가 끝날때마다 상태값을 로그로 출력
  const state = store.getState();
  console.log(state);
});

//! 각 액션 테스트
store.dispatch(addTimeline({ id: 1, desc: '짱이다' }));
store.dispatch(addTimeline({ id: 2, desc: '별로다' }));
store.dispatch(increseNextPage());
store.dispatch(editTimeline({ id: 2, desc: '우오아와와와와 업뎃' }));
store.dispatch(removeTimeline({ id: 1, desc: '짱이다' }));
store.dispatch(addFriend({ id: 1, name: '산적' }));
store.dispatch(addFriend({ id: 3, name: '제이미올리버' }));
store.dispatch(removeFriend({ id: 1, name: '산적' }));
store.dispatch(editFriend({ id: 2, name: '육식맨' }));

export default store;
