import React, {useReducer, useEffect} from 'react';
import { When } from '../if';
import Modal from '../modal';

import Header from '../header/header';
import Form from '../form/form';
import TodoList from '../todo-list/todo-list';
import TodoDetails from '../todo-details/todo-details';

import './todo.scss';

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

  useEffect(() => {
    if (props.getTodoList) {
      props.getTodoList(dispatch);
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

export default ToDo;
