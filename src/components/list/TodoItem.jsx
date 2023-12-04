import PropTypes from "prop-types";
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../api/apiSlice";
import { useState } from "react";

const TodoItem = ({ todo }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const handleUpdate = () => {
    updateTodo({ ...todo, title: editedTitle });
    setIsEditing(false);
  };
  return (
    <article key={todo.id}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            id={todo.id}
            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
          />
          <label htmlFor={todo.id}>{todo.title}</label>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo({ id: todo.id })}>Delete</button>
        </div>
      )}
    </article>
  );
};
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
