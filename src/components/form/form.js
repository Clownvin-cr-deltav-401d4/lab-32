import React from 'react';

//import useForm from '../../hooks/useForm';
import { connect } from 'react-redux';
import { getUpdateAction } from '../../store/form';

import './form.scss';

const Form = props => {
  // eslint-disable-next-line
  //const [values, onChange, onSubmit] = useForm(props.addItem);
  const onSubmit = e => {
    e.preventDefault();
    props.addItem(props.form);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>
            Add Todo
          </legend>
          <label>
            <span>Details</span>
            <input
              name="text"
              placeholder="What needs done..."
              onChange={props.onChange}
            />
          </label>
          <label>
            <span>Difficulty</span>
            <input type="range" min="1" max="5" name="difficulty" value={props.form.difficulty} onChange={props.onChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={props.onChange} />
          </label>
          <label>
            <span>Due</span>
            <input type="date" name="due" onChange={props.onChange} />
          </label>
          <button>Add</button>
        </fieldset>
      </form>
    </div>
  );
};
export default connect(state => ({form: state.formReducer}), dispatch => ({
  onChange: event => dispatch(getUpdateAction(event)),
}))(Form);
