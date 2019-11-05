'use strict';

export default function reducer(state = {details: {}, showDetails: false}, action) {
  console.log(state, action);
  console.log(!!state.showDetails);
  switch (action.type) {
  case 'toggleDetails': //, id });\
    return {details: action.item || {}, showDetails: state.showDetails ? false : true};
  }
  return state;
}
