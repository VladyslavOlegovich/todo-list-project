import { useAddTodoMutation } from "../../api/apiSlice";
import { useState } from "react";
const Form = () => {
  const [newTodo, setNewTodo] = useState("");
  const [addTodo] = useAddTodoMutation();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({ userId: 1, title: newTodo, completed: false });
        setNewTodo("");
      }}
    >
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">Add</button>
    </form>
  );
};
export default Form;
