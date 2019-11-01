import React, {useState} from 'react';

import './todo-list.scss';

import TodoItem from '../todo-item';
import useItemCount from '../../hooks/useItemCount';

import useDisplayCompleted from '../../hooks/useDisplayCompleted';

const TodoList = props => {
  const displayCompleted = useDisplayCompleted();
  const list = !displayCompleted.displayCompleted ? props.todoList.filter(item => !item.complete) : props.todoList;
  const itemCount = useItemCount();
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(list.length / itemCount.count);
  const start = page * itemCount.count;
  const end = Math.min(start + itemCount.count, list.length);

  if (list.length === 0) {
    return null;
  }

  if (page >= pageCount) {
    setPage(pageCount - 1);
  }
  /*
  for page buttons.
  
  */
  const getPageButtons = () => {
    let buttons = [];
    const count = Math.ceil(list.length / itemCount.count);
    for (let i = 0; i < count; i++) {
      buttons.push((
        <button key={i} onClick={() => setPage(i)} disabled={page === i}>{ i + 1 }</button>
      ));
    }
    return buttons;
  }

  return (
    <div>
      <input type="range" min={1} max={list.length} value={itemCount.count} onChange={ e => itemCount.setCount(e.target.value) } />
      <button onClick={displayCompleted.toggleDisplayCompleted}>{displayCompleted.displayCompleted ? 'Hide' : 'Show'} Completed</button>
      <ul>
        { list.slice(start, end).map(item => (
          <TodoItem key={item._id} item={item} toggleComplete={props.toggleComplete} toggleDetails={props.toggleDetails} deleteItem={props.deleteItem} />
        ))}
      </ul>
      <p>Page {page + 1} of {pageCount}</p>
      <button onClick={() => setPage(page - 1)} disabled={page <= 0}>Prev</button>
      {
        getPageButtons()
      }
      <button onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1}>Next</button>
    </div>
  );
};

export default TodoList;
