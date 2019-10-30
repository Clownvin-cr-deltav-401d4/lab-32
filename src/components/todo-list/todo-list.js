import React, {useState} from 'react';

import './todo-list.scss';

import TodoItem from '../todo-item';
import useItemCount from '../../hooks/useItemCount';

const TodoList = props => {
  const itemCount = useItemCount();
  const [page, setPage] = useState(0);
  const start = page * itemCount.count;
  const end = Math.min(start + itemCount.count, props.todoList.length);

  const getButtons = () => {
    let buttons = [];
    const count = Math.ceil(props.todoList.length / itemCount.count);
    for (let i = 0; i < count; i++) {
      buttons.push((
        <button key={i} onClick={() => setPage(i)} disabled={page === i}>{ i + 1 }</button>
      ));
    }
    return buttons;
  }

  return (
    <div>
      Results per page:
      <button onClick={() => itemCount.setCount(5)} >5</button>
      <button onClick={() => itemCount.setCount(10)} >10</button>
      <button onClick={() => itemCount.setCount(15)} >15</button>
      <button onClick={() => itemCount.setCount(20)} >20</button>
      <br />
      <ul>
        { props.todoList.slice(start, end).map(item => (
          <TodoItem key={item._id} item={item} toggleComplete={props.toggleComplete} toggleDetails={props.toggleDetails} deleteItem={props.deleteItem} />
        ))}
      </ul>
      {
        getButtons()
      }
    </div>
  );
};

export default TodoList;
