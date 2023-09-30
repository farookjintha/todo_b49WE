import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import TodoCard from "./components/TodoCard/todoCard";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: null,
    name: "",
    description: "",
    status: "NOT COMPLETED",
  });

  const [filteredTodos, setFilteredTodos] = useState([]);

  const [filterBy, setFilterBy] = useState("ALL");

  const handleTodoForm = (value) => {
    let todoData = { ...value, id: todos.length + 1 };
    setTodo((todo) => {
      return { ...todo, ...todoData };
    });
  };

  const addTodo = (e) => {
    e.preventDefault();

    if (todo.name && todo.description) {
      setTodos((todos) => {
        return [...todos, todo];
      });
    }

    setTodo({
      id: null,
      name: "",
      description: "",
      status: "NOT COMPLETED",
    });
  };

  const editTodo = (editPayload) => {
    setTodos((todo_list) =>
      todo_list.map((todo_item) => {
        if (todo_item.id === editPayload.id) {
          return {
            ...todo_item,
            ...editPayload,
          };
        }
        return todo_item;
      })
    );
  };

  const deleteTodo = () => {};

  useEffect(() => {
    setFilteredTodos(todos);
  }, []);

  useEffect(() => {
    if (filterBy !== "ALL") {
      let filtered = todos.filter((item) => item.status === filterBy);
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todos);
    }
    console.log("Filter By: ", filterBy);
  }, [filterBy, todos]);

  return (
    <div className="App">
      <div>
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value={"ALL"}>All</option>
          <option value={"COMPLETED"}>Completed</option>
          <option value={"NOT COMPLETED"}>Not Completed</option>
        </select>
      </div>
      <div>
        <form onSubmit={addTodo}>
          <div>
            <input
              value={todo.name}
              placeholder="Todo Name"
              onChange={(e) => handleTodoForm({ name: e.target.value })}
            />

            <input
              placeholder="Todo Description"
              value={todo.description}
              onChange={(e) => handleTodoForm({ description: e.target.value })}
            />

            <button type="submit">Add Todo</button>
          </div>

          <div className="todo-container">
            {filteredTodos.length ? (
              filteredTodos.map((item, index) => (
                <TodoCard
                  editTodo={editTodo}
                  deleteTodo={deleteTodo}
                  todo={item}
                  key={index}
                />
              ))
            ) : (
              <div> No Todo available. </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
