import React, { useState, useEffect } from "react";
import axios from "axios";
interface Todo {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
}

function WorkingWithArrays() {
  const API = "http://localhost:4000/a5/todos";
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const updateTodo = async () => {
    const response = await axios.put(`${API}/${todo.id}`, todo);
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };


  const [todos, setTodos] = useState<Todo[]>([]);

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    const newTodo: Todo = response.data;
    setTodos([...todos, newTodo]);
  };

  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };


  useEffect(() => {
    fetchTodos();
  }, []);
  const removeTodo = async (todo: any) => {
    const response = await axios
      .get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };
  const fetchTodoById = async (id: any) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };
  const deleteTodo = async (todo : any) => {
    const response = await axios.delete(`${API}/${todo.id}`);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };



  return (
    <div>
      <h3>Working with Arrays</h3>
      <button onClick={createTodo} className="btn btn-primary">
        Create Todo
      </button>
      <button onClick={() => deleteTodo(todo)}
        className="btn btn-danger float-end ms-2">
        Delete
      </button>
      <button onClick={postTodo}>
        Post Todo
      </button>
      <button onClick={updateTodo} className="btn btn-primary">
        Update Todo
      </button>


      <ul className="list-group">
        {todos.map((todo: any) => (
          <li key={todo.id} className="list-group-item">
            <button onClick={() => fetchTodoById(todo.id)} >
              Edit
            </button>
            <button onClick={() => removeTodo(todo)} >
              Remove
            </button>

            {todo.title}
          </li>
        ))}
      </ul>
      <h4>Updating Todo Item</h4>
      <label>
        Description:
        <input type="text" value={todo.description} />
      </label>
      <label>
        Completed:
        <input type="checkbox" checked={todo.completed} />
      </label>

      <h4>Retrieving Arrays</h4>
      <a href={API}>
        Get Todos
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <input value={todo.id}
        onChange={(e: any) => setTodo({
          ...todo,
          id: e.target.value
        })} />
      <input type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value
        })} />

      <button onClick={updateTitle} >
        Update Title
      </button>


      <h3>Updating an Item in an Array</h3>
      <a href={`${API}/${todo.id}/title/${todo.title}`} >
        Update Title to {todo.title}
      </a>



      <a href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <h3>Filtering Array Items</h3>
      <a href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a href={`${API}/create`}>
        Create Todo
      </a>

      <h3>Deleting from an Array</h3>
      <a href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>


    </div>
  );
}
export default WorkingWithArrays;

