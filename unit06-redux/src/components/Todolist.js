import React from 'react';
import Todo from './Todo';

const Todolist = (props) => {
  const { isLoading, todos, resetTodos, fetchData } = props;
  console.log(todos);
  return (
    <>
      <h1>TODO-LIST</h1>
      <div>
        <button onClick={resetTodos}>리셋</button>
        <button onClick={fetchData}>로드</button>
      </div>
      {isLoading ? console.log('로딩 중') : console.log('로딩 완료')}
      {todos == []
        ? '??'
        : todos.map((todo) => {
            return <Todo todo={todo} {...props} key={todo.id + '-todos'} />;
          })}
    </>
  );
};

export default Todolist;
