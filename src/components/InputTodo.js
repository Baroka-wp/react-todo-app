import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InputTodo = ({ addTodoProps }) => {
  const [title, SetTitle] = useState('');

  const onChange = (e) => {
    SetTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim()) {
      addTodoProps(title);
      SetTitle('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-text"
        value={title}
        name="title"
        placeholder="Add todo"
        onChange={onChange}
      />
      <button
        type="button"
        className="input-submit"
      >
        Submit
      </button>
    </form>
  );
};
InputTodo.propTypes = {
  addTodoProps: PropTypes.func.isRequired,
};
export default InputTodo;
