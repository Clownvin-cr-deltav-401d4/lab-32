import React from 'react';

import useForm from '../../hooks/useForm';

import './form.scss';

const Form = props => {
  // eslint-disable-next-line
  const [values, onChange, onSubmit] = useForm(props.addItem);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>
            Add Todo
          </legend>
          <label>
            <span>Text</span>
            <input
              name="text"
              placeholder="What needs done..."
              onChange={onChange}
            />
          </label>
          <label>
            <span>Difficulty</span>
            <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={onChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={onChange} />
          </label>
          <label>
            <span>Due</span>
            <input type="date" name="due" onChange={onChange} />
          </label>
          <button>Add</button>
        </fieldset>
      </form>
    </div>
  );
};
export default Form;
