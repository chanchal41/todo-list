

import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editInput, setEditInput] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodos = {
      id: new Date().getTime(),
      text: input
    };
    setTodos([...todos].concat(newTodos));
    console.log(newTodos);
    setInput("");
  };

  function handleDelete(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    console.log(updatedTodos);
  }

  function saveEdit(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editInput;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditInput("");
    setEditTodo(null);
    console.log(updatedTodos);
  }

  return (
    <div className="App">
      <h1 style={{ marginLeft: 50 }}>TodoList</h1>
      <form >
        <TextField value={input} variant="outlined" onChange={(e) => setInput(e.target.value)} />
        <Button onClick={handleSubmit} color="primary" variant="contained" style={{ marginLeft: 2, height: 55 }} >Add</Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodo === todo.id ? (
              <span>
                <TextField
                  variant="outlined"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
              </span>
            ) : (
              <div>{todo.text}</div>
            )}

            <span>
              <Button variant="contained" color="primary" onClick={() => handleDelete(todo.id)} style={{ marginLeft: 10, marginTop: 10 }}>delete</Button>
              <Button variant="contained" color="secondary" onClick={() => setEditTodo(todo.id)} style={{ marginLeft: 10, marginTop: 10 }}>Edit</Button>
              {editTodo ? (
                <Button variant="contained" color="primary" onClick={() => saveEdit(todo.id)} style={{ marginLeft: 10, marginTop: 10 }} >save</Button>
              ) : (
                ""
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;