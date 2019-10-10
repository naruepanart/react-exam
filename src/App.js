import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import uuid from "uuid/v4";

const Home = () => {
  const todos = useSelector(state => state.todos);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(uuid());

  const dispatch = useDispatch();

  const addTodo = id => dispatch({ type: "ADD_TODO", payload: id });

  const handleSubmit = e => {
    e.preventDefault();

    if (isEdit) {
      dispatch({ type: "EDIT_TODO", payload: id, name: name });
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
              onChange={e => setName(e.target.value)}
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
                    <button
                      onClick={() =>
                        dispatch({ type: "DELETE_TODO", payload: todo.id })
                      }
                    >
                      Delete
                    </button>
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
