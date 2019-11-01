import React from 'react';

import './todo-item.scss';

function TodoItem(props) {
  const toggleComplete = props.toggleComplete || (() => {});
  const deleteItem = props.deleteItem || (() => {});
  return (
    <li
      className={`complete-${props.item.complete.toString()}`}
      key={props.item._id}
    >
      <span onClick={() => toggleComplete(props.item._id)}>
        {props.item.text}
      </span>
      <button onClick={() => props.toggleDetails(props.item._id)}>
        Details
      </button>
      <button className="delete" onClick={() => deleteItem(props.item._id)} disabled={!props.deleteItem}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
