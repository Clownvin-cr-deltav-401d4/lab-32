import React from 'react';

import style from './todo-details.module.scss';

function TodoDetails(props) {
  return (
    <div className={style.todoDetails}>
      <header>
        <span>Assigned To: {props.item.assignee}</span>
        <span>Due: {props.item.due}</span>
      </header>
      <div className="item">
        {props.item.text}
      </div>
    </div>
  );
}

export default TodoDetails;
