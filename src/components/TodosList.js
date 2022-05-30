import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodosList = ({ handleChangeProps, deleteTodoProps, todos }) => (
  <ul>
    {
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleChangeProps={handleChangeProps}
                deleteTodoProps={deleteTodoProps}
              />
            ))
        }
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.instanceOf(Array).isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
};

export default TodosList;
