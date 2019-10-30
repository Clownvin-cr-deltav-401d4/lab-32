import React, {useReducer} from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal';

import Header from '../header/header';
import Form from '../form/form';
import TodoList from '../todo-list/todo-list';
import TodoDetails from '../todo-details/todo-details';

import './todo.scss';

function reducer(state, action) {
  let item;
  switch (action.type) {
    case 'input': //change: {[name]: value}});
      state.item = {...state.item, ...action.change};
      break;
    case 'add': //, item });
      const defaults = { _id: uuid(), complete:false };
      item = Object.assign({}, state.item, defaults);
      state.todoList.push(item);
      break;
    case 'delete': //, id });
      state.todoList = state.todoList.filter(item => item._id !== action.id);
      break;
    case 'save': //, item });
      state.todoList = state.todoList.map(item =>
        item._id === action.item._id ? action.item : item
      );
      break;
    case 'toggleComplete': //, id });
      state.todoList = state.todoList.map(item =>
        item._id === action.id ? {
          ...item,
          complete: !item.complete,
        } : item
      );
      break;
    case 'toggleDetails': //, id });
        item = state.todoList.find(item => item._id === action.id);
        state.details = item || {};
        state.showDetails = !!item;
      break;
    default:
      console.error('Uncaught action.type:', action.type);
  }
  return {...state};
}

function ToDo(props) {
  const [state, dispatchFunc] = useReducer(props.reducer, {
    todoList: [],
    item: {},
    showDetails: false,
    details: {},
  });

  const dispatch = (action) => {
    dispatchFunc({...action, dispatch});
  }

  const handleInputChange = e => {
    let { name, value } = e.target;
    dispatch({ type: 'input', change: {[name]: value}});
  };

  const addItem = (e) => {

    e.preventDefault();
    e.target.reset();

    dispatch({ type: 'add'});

  };

  const deleteItem = id => {

    dispatch({ type: 'delete', id });

  };

  const saveItem = item => {

    dispatch({ type: 'save', item });

  };

  const toggleComplete = id => {

    dispatch({ type: 'toggleComplete', id });
  };

  const toggleDetails = id => {
    dispatch({ type: 'toggleDetails', id });
  }

  return (
    <>
      <Header count={state.todoList.filter( item => !item.complete ).length} />
      <section className="todo">
        <Form addItem={addItem} handleInputChange={handleInputChange} />
        <TodoList todoList={state.todoList} toggleComplete={toggleComplete} toggleDetails={toggleDetails} deleteItem={deleteItem} />
      </section>

      <When condition={state.showDetails}> 
        <Modal title="To Do Item" close={toggleDetails}>
          <TodoDetails item={state.details} />
        </Modal>
      </When>
    </>
  );
}

export default ToDo;
