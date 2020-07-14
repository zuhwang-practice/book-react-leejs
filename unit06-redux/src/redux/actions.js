import {
  FETCH_TODOS,
  CREATE,
  UPDATE,
  DELETE,
  RESET,
  TOGGLE_ISLOADING,
} from './types';

export const fetchTodos = (todos) => {
  return {
    type: FETCH_TODOS,
    payload: todos, // [{},{},...]
  };
};

export const createTodos = (newTodos) => ({
  type: CREATE,
  payload: newTodos,
});

export const updateTodos = ({ id, title }) => ({
  type: UPDATE,
  payload: {
    id: id - 1,
    title: title,
  },
});

export const deleteTodos = (id) => ({
  type: DELETE,
  payload: id - 1,
});

export const resetTodos = () => ({
  type: RESET,
});

export const toggleIsLoading = () => {
  return {
    type: TOGGLE_ISLOADING,
  };
};
