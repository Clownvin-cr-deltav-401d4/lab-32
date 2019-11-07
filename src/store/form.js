'use strict';

const initialState = {difficulty: 3};

export default function reducer(state = {...initialState}, action) {
  switch (action.type) {
  case 'updateForm': //, id });\
    return {...state, [action.name]: action.value};
  }
  return state;
}

function getUpdateAction(event) {
  event.preventDefault();
  const { target: field } = event;
  return {
    type: 'updateForm',
    name: field.name,
    value: field.value,
  };
}

export {
  getUpdateAction,
};
