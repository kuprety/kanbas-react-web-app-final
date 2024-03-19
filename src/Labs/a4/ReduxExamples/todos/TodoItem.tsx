import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { TodoType } from "../../../store";
function TodoItem({ todo } : { todo: TodoType }) {

//   deleteTodo,
//   setTodo
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button onClick={() => dispatch(deleteTodo(todo.id))} className="btn btn-danger"> Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}className=" btn btn-primary"> Edit </button>
      {todo.title}
    </li>
  );
}
export default TodoItem;