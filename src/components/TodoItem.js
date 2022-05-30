import PropTypes from 'prop-types';
import styles from './TodoItem.module.scss';

const TodoItem = ({ todo, handleChangeProps, deleteTodoProps }) => {
  const { completed, id, title } = todo;
  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  return (
    <li className={styles.item}>

      <input
        type="checkbox"
        className={styles.checkbox}
        checked={completed}
        onChange={() => handleChangeProps(id)}
      />
      <span style={completed ? completedStyle : null}>
        {title}
      </span>
      <button
        type="button"
        onClick={() => deleteTodoProps(id)}
      >
        Delete
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.instanceOf(Object).isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
};

export default TodoItem;
