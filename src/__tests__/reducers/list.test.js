'use strict';

import reducer from '../../store/todo-list';

describe('Todo-List reducer', () => {
  let state = {todoList: []};

  it('Can add items to the list', () => {
    let newState = reducer(state, {type: 'add', item: {text: 'hello', _id: '123', complete: false}});
    expect(newState).toEqual({todoList: [{text: 'hello', _id: '123', complete: false}]});
    state = newState;
  });

  it('Can delete items from the list', () => {
    state = reducer(state, {type: 'add', item: {text: 'Boop', _id: '3152'}});
    expect(state).toEqual({todoList: [{text: 'hello', _id: '123', complete: false}, {text: 'Boop', complete: false, _id: '3152'}]});
    let newState = reducer(state, {type: 'delete', id: '3152'});
    expect(newState).toEqual({todoList: [{text: 'hello', _id: '123', complete: false}]});
    state = newState;
  });

  it('Can toggle complete on any given item', () => {
    state = reducer(state, {type: 'toggleComplete', id: '123'});
    expect(state).toEqual({todoList: [{text: 'hello', _id: '123', complete: true}]});
    state = reducer(state, {type: 'toggleComplete', id: '123'});
    expect(state).toEqual({todoList: [{text: 'hello', _id: '123', complete: false}]});
  });
});
