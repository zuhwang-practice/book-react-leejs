import createReducer from '../common/createReducer';
// timeline/state는 공통로직 사용하지 않음~!

// 타임라인 덕패턴
const ADD = 'timeline/ADD';
const REMOVE = 'timeline/REMOVE';
const EDIT = 'timeline/EDIT';
// 무한스크롤 용 페이지 네이션
const INCRESE_NEXT_PAGE = 'timeline/INCRESE_NEXT_PAGE';

export const addTimeline = (timeline) => ({ type: ADD, payload: timeline });
export const removeTimeline = (timeline) => ({
  type: REMOVE,
  payload: timeline,
});
export const editTimeline = (timeline) => ({ type: EDIT, payload: timeline });
export const increseNextPage = () => ({ type: INCRESE_NEXT_PAGE });

const initState = { timelines: [], nextPage: 0 };

const reducer = createReducer(initState, {
  [ADD]: (state, action) => state.timelines.push(action.payload),
  [REMOVE]: (state, action) =>
    state.timelines.filter((tl) => tl.id !== action.payload.id),
  [EDIT]: (state, action) => {
    const index = state.timelines.findIndex(
      (tl) => tl.id === action.payload.id
    );
    if (index >= 0) state.timelines[index] = action.payload;
  },
  [INCRESE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
});

export default reducer;
