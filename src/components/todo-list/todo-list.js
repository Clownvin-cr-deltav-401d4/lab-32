import React, {useState} from 'react';

import './todo-list.scss';

import TodoItem from '../todo-item';
import useItemCount from '../../hooks/useItemCount';

const TodoList = props => {
  const itemCount = useItemCount();
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(props.todoList.length / itemCount.count);
  const start = page * itemCount.count;
  const end = Math.min(start + itemCount.count, props.todoList.length);
  if (props.todoList.length === 0) {
    return null;
  }
  /*
  for page buttons.
  const count = Math.ceil(props.todoList.length / itemCount.count);
    for (let i = 0; i < count; i++) {
      buttons.push((
        <button key={i} onClick={() => setPage(i)} disabled={page === i}>{ i + 1 }</button>
      ));
    }
  */
  const getPageButtons = () => {
    let buttons = [];
    if (page < pageCount - 1) {
      buttons.push(<button onClick={() => setPage(page + 1)}>Next</button>);
    }
    if (page > 0) {
      buttons.push(<button onClick={() => setPage(page - 1)}>Previous</button>);
    }
    return buttons;
  }

  const getCountButtons = () => {
    return (
      <div>
        Results per page:
        <button onClick={() => itemCount.setCount(5)} >5</button>
        <button onClick={() => itemCount.setCount(10)} >10</button>
        <button onClick={() => itemCount.setCount(15)} >15</button>
        <button onClick={() => itemCount.setCount(20)} >20</button>
      </div>
    )
  }

  return (
    <div>
      {
        getCountButtons()
      }
      <ul>
        { props.todoList.slice(start, end).map(item => (
          <TodoItem key={item._id} item={item} toggleComplete={props.toggleComplete} toggleDetails={props.toggleDetails} deleteItem={props.deleteItem} />
        ))}
      </ul>
      Page {page + 1} of {pageCount}
      {
        getPageButtons()
      }
    </div>
  );
};

export default TodoList;
