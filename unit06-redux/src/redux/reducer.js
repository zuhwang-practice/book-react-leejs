import produce from 'immer';
import {
  FETCH_TODOS,
  CREATE,
  UPDATE,
  DELETE,
  RESET,
  TOGGLE_ISLOADING,
} from './types';

const initState = {
  todos: [], // { id : number, title: string }
  isLoading: false,
};

export const reducer = (state = initState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case FETCH_TODOS:
        draftState.todos = action.payload;
        break;
      case CREATE:
        draftState.todos.push(action.payload);
        break;
      case UPDATE:
        draftState.todos[action.payload.id].title = action.payload.title;
        break;
      case DELETE:
        delete draftState.todos[action.payload];
        break;
      case TOGGLE_ISLOADING:
        draftState.isLoading = !state.isLoading;
        break;
      case RESET:
        draftState.todos = [];
        break;
      default:
        break;
    }
  });
};
