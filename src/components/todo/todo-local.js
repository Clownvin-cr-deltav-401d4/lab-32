import React, {useReducer, useEffect} from 'react';
import { When } from '../if';
import Modal from '../modal';

import Header from '../header/header';
import Form from '../form/form';
import TodoList from '../todo-list/todo-list';
import TodoDetails from '../todo-details/todo-details';

import useDisplayCompleted from '../../hooks/useDisplayCompleted';

import './todo.scss';

import uuid from 'uuid/v4';

function reducer(state, action) {
  let item;
  switch (action.type) {
    case 'add': //, item });
      const defaults = { _id: uuid(), complete:false };
      item = Object.assign({}, action.item, defaults);
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

function ToDoLocal(props) {
  const [state, dispatchFunc] = useReducer(reducer, {
    todoList: [],
    item: {},
    showDetails: false,
    details: {},
  });

  const dispatch = (action) => {
    dispatchFunc({...action, dispatch});
  }

  if(!state.todoList) {
    dispatch({type: 'initialize'});
  }

  const addItem = (item) => {
    console.log(item);
    dispatch({ type: 'add', item});
  };

  const deleteItem = id => {

    dispatch({ type: 'delete', id });

  };

  const {getTodoList} = props;

  useEffect(() => {
    if (getTodoList) {
      getTodoList(dispatch);
    }
  }, []);

  // const saveItem = item => {

  //   dispatch({ type: 'save', item });

  // };

  const toggleComplete = id => {

    dispatch({ type: 'toggleComplete', id });
  };

  const toggleDetails = id => {
    dispatch({ type: 'toggleDetails', id });
  }

  const displayCompleted = useDisplayCompleted();

  return (
    <>
      <Header count={state.todoList ? state.todoList.filter( item => !item.complete ).length : 0} />
      <section className="todo">
        <Form addItem={addItem} />
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

export default ToDoLocal;
