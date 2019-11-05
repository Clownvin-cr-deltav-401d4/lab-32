'use strict';

export default function reducer(state = {details: {}, showDetails: false}, action) {
  switch (action.type) {
  case 'toggleDetails': //, id });\
    return {details: action.item || {}, showDetails: state.showDetails ? false : true};
  }
  return state;
}
