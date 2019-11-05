'use strict';

import reducer from '../../store/details';

describe('Details Reducer', () => {
  it('Only toggles whether or not to show and item, and also takes in said item', () => {
    const action = {type: 'toggleDetails', item: 'Hello'};
    expect(reducer({showDetails: false}, action)).toEqual({details: 'Hello', showDetails: true});
    action.item = 'Not hello';
    expect(reducer({showDetails: true}, action)).toEqual({details: 'Not hello', showDetails: false});
  });
});
