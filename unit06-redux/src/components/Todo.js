import React, { useState } from 'react';

const Todo = ({ todo, updateTodos, deleteTodos }) => {
  const [updateValue, setUpdateValue] = useState('');
  const [updateDisplay, setUpdateDisplay] = useState(false);
  const onChangeUpdate = (e) => {
    setUpdateValue(e.target.value);
  };
  const onClickUpdateFinBtn = (e) => {
    updateValue === '' && updateTodos({ id: todo.id, title: todo.title });
    updateValue !== '' && updateTodos({ id: todo.id, title: updateValue });

    setUpdateDisplay(!updateDisplay);
  };
  return (
    <div>
      <button onClick={() => deleteTodos(todo.id)}>삭제</button>
      <button onClick={() => setUpdateDisplay(!updateDisplay)}>수정</button>
      <span> {todo.id} : </span>
      <span>{todo.title}</span>
      {updateDisplay && (
        <div>
          <input
            type='text'
            defaultValue={todo.title}
            style={{ width: '400px' }}
            onChange={onChangeUpdate}
          />
          <button onClick={onClickUpdateFinBtn}>수정완료</button>
        </div>
      )}
    </div>
  );
};

export default Todo;
