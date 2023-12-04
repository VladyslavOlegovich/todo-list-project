/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useGetTodosQuery, useGetTotalTodosQuery } from "../../api/apiSlice";
import TodoItem from "./TodoItem";

const List = () => {
  const elementsOnPage = 5;
  const [page, setPage] = useState(1);
  const [totalTodosLength, setTotalTodosLength] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: todos,
    isLoading: todosLoading,
    isFetching: todosFetching,
    isError: todosError,
    error: todosErrorData,
  } = useGetTodosQuery(page, elementsOnPage);

  const {
    data: totalTodos,
    isLoading: totalTodosLoading,
    isError: totalTodosError,
    error: totalTodosErrorData,
  } = useGetTotalTodosQuery();

  useEffect(() => {
    if (!todosLoading && !totalTodosLoading && !totalTodosError) {
      const calculatedTotalPages = Math.ceil(totalTodosLength / elementsOnPage);
      setTotalPages(calculatedTotalPages);
    }
  }, [todosLoading, totalTodosLoading, totalTodosError, totalTodosLength]);

  if (todosLoading || totalTodosLoading) return <p>Loading...</p>;
  if (todosError || totalTodosError)
    return (
      <p>Error: {todosErrorData?.message || totalTodosErrorData?.message}</p>
    );

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <div className="navigation">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || todosFetching}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages || todosFetching}
        >
          Next
        </button>
        <p>{`${page} / ${totalPages}`}</p>
      </div>
    </div>
  );
};
export default List;
