// import createReducer from '../common/createReducer';
// ! 공통로직 합체 모듈 사용하기
import createItemsLogic from '../common/createItemsLogic';

const { add, remove, edit, reducer } = createItemsLogic('friends');

const addFriend = add;
const removeFriend = remove;
const editFriend = edit;

export { addFriend, removeFriend, editFriend };
export default reducer;
