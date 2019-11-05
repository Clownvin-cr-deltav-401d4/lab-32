import React, { useReducer, useEffect } from 'react';
import { When } from '../if';
import Modal from '../modal';

import Header from '../header/header';
import Form from '../form/form';
import TodoList from '../todo-list/todo-list';
import TodoDetails from '../todo-details/todo-details';

import { connect } from 'react-redux';

import './todo.scss';

function ToDoLocal(props) {
  console.log('Rendering...', props);
  return (
    <>
      <Header count={props.todoList ? props.todoList.filter(item => !item.complete).length : 0} />
      <section className="todo">
        <Form addItem={props.addItem} />
        <TodoList todoList={props.todoList} toggleComplete={props.toggleComplete} toggleDetails={props.toggleDetails} deleteItem={props.deleteItem} />
      </section>

      <When condition={props.showDetails}>
        <Modal title="To Do Item" close={props.toggleDetails}>
          <TodoDetails item={props.details} />
        </Modal>
      </When>
    </>
  );
}

export default connect(state => ({...state.listReducer, ...state.detailsReducer}), dispatch => ({
  addItem: (item) => dispatch({ type: 'add', item }),
  deleteItem: id => dispatch({ type: 'delete', id }),
  toggleComplete: id => dispatch({ type: 'toggleComplete', id }),
  toggleDetails: item => dispatch({ type: 'toggleDetails', item }),
}))(ToDoLocal);
