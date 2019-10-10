import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTodoAction, deleteTodoAction } from "./redux";
import { addTodoAction } from "./redux";
import uuid from "uuid/v4";

const Home = () => {
  const todos = useSelector(state => state.todos);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(null);

  const dispatch = useDispatch();

  const editTodo = (id, name) => dispatch(editTodoAction(id, name));
  const deleteTodo = id => dispatch(deleteTodoAction(id));
  const addTodo = name => dispatch(addTodoAction(name));

  const onChange = event => {
    setName(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();

    if (isEdit) {
      editTodo(id, name);
    } else {
      addTodo({
        id: uuid(),
        name: name
      });
    }

    setIsEdit(false);
    setName("");
  };
  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>Todo app</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name :
            <input
              type="text"
              value={name}
              onChange={onChange}
              placeholder="Enter name"
            />
          </label>
          <br></br>
          <br></br>
          <button type="submit" value="Submit">
            {isEdit ? <p>Update</p> : <p>Submit</p>}
          </button>
        </form>
      </div>
      <table>
        <tbody>
          <tr>
            <th>name</th>
          </tr>
        </tbody>
      </table>

      {todos.map((todo, id) => {
        return (
          <div key={id}>
            <table>
              <tbody key={todo.id}>
                <tr>
                  <td>{todo.name}</td>

                  <td>
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setId(todo.id);
                        setName(todo.name);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Home;