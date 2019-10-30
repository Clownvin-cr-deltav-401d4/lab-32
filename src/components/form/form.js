import React from 'react';

import useForm from '../../hooks/useForm';

import './form.scss';

const Form = props => {
  const [values, onChange, onSubmit] = useForm(props.addItem);

  return (
    <div>
      <h3>Add Item</h3>
      <form onSubmit={onSubmit}>
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Add To Do List Item"
            onChange={onChange}
          />
        </label>
        <label>
          <span>Difficulty Rating</span>
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
        <button>Add Item</button>
      </form>
    </div>
  );
};
export default Form;
