import React from 'react';

import './todo-item.scss';

function TodoItem(props) {
  return (
    <li
      className={`complete-${props.item.complete.toString()}`}
      key={props.item._id}
    >
      <span onClick={() => props.toggleComplete(props.item._id)}>
        {props.item.text}
      </span>
      <button onClick={() => props.toggleDetails(props.item._id)}>
        Details
      </button>
      <button className="delete" onClick={() => props.deleteItem(props.item._id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
