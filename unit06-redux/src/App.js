import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Todolist from './components/Todolist';
import {
  fetchTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  resetTodos,
  toggleIsLoading,
} from './redux/actions';

// 데이터 업데이트
function App(props) {
  const { fetchTodos, toggleIsLoading } = props;
  const fetchData = async () => {
    toggleIsLoading();
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const result = await res.data.filter((_, index) => index < 20);
      toggleIsLoading();
      fetchTodos(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Todolist fetchData={fetchData} {...props} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    isLoading: state.isLoading,
  };
};
export default connect(mapStateToProps, {
  fetchTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  resetTodos,
  toggleIsLoading,
})(App);
