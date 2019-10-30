import React from 'react';

import './todo-list.scss';

import TodoItem from '../todo-item';

const TodoList = props => {
  return (
    <div>
      <ul>
        { props.todoList.map(item => (
          <TodoItem key={item._id} item={item} toggleComplete={props.toggleComplete} toggleDetails={props.toggleDetails} deleteItem={props.deleteItem} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
