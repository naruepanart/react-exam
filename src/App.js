import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTodoAction, deleteTodoAction } from "./redux";
import { addTodoAction } from "./redux";
import uuid from "uuid/v4";

const App = () => {
  const todos = useSelector(state => state.todos);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState({ Mr: "Mr.", Mrs: "Mrs." });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nationality, setNationality] = useState({
    Thai: "Thai",
    Laos: "Laos"
  });
  const [gender, setGender] = useState({
    Male: "Male",
    Female: "Female",
    Unisex: "Unisex"
  });
  const [mobilephone, setMobilephone] = useState("");
  const [inputmobilephone, setInputMobilephone] = useState("");
  const [expectedsalary, setExpectedsalary] = useState("");

  const dispatch = useDispatch();
  const editTodo = (
    todoId,
    title,
    firstname,
    lastname,
    birthday,
    nationality,
    gender,
    mobilephone,
    inputmobilephone,
    expectedsalary
  ) =>
    dispatch(
      editTodoAction(
        todoId,
        title,
        firstname,
        lastname,
        birthday,
        nationality,
        gender,
        mobilephone,
        inputmobilephone,
        expectedsalary
      )
    );

  const deleteTodo = todoId => dispatch(deleteTodoAction(todoId));

  const addTodo = (
    title,
    firstname,
    lastname,
    birthday,
    nationality,
    gender,
    mobilephone,
    inputmobilephone,
    expectedsalary
  ) =>
    dispatch(
      addTodoAction(
        title,
        firstname,
        lastname,
        birthday,
        nationality,
        gender,
        mobilephone,
        inputmobilephone,
        expectedsalary
      )
    );

  const edit = (
    id,
    title,
    firstname,
    lastname,
    birthday,
    nationality,
    gender,
    mobilephone,
    inputmobilephone,
    expectedsalary
  ) => {
    setId(id);
    setTitle(title);
    setFirstname(firstname);
    setLastname(lastname);
    setBirthday(birthday);
    setNationality(nationality);
    setGender(gender);
    setMobilephone(mobilephone);
    setInputMobilephone(inputmobilephone);
    setExpectedsalary(expectedsalary);
    setIsEdit(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isEdit) {
      editTodo(
        id,
        title,
        firstname,
        lastname,
        birthday,
        nationality,
        gender,
        mobilephone,
        inputmobilephone,
        expectedsalary
      );
    } else {
      addTodo({
        id: uuid(),
        title: title,
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        nationality: nationality,
        gender: gender,
        mobilephone: mobilephone,
        inputmobilephone: inputmobilephone,
        expectedsalary: expectedsalary
      });
    }

    setIsEdit(false);
    setTitle("");
    setFirstname("");
    setLastname("");
    setBirthday("");
    setNationality("");
    setGender("");
    setMobilephone("");
    setInputMobilephone("");
    setExpectedsalary("");
  };
  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>Head</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Title :
            <select
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            >
              <option value="">-- Please Select --</option>
              <option value={title.Mr}>Mr.</option>
              <option value={title.Mrs}>Mrs.</option>
            </select>
          </label>
          &nbsp;
          <label>
            Firstname :
            <input
              type="text"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              placeholder="Enter Firstname"
              required
            />
          </label>
          &nbsp;
          <label>
            Lastname :
            <input
              type="text"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              placeholder="Enter Lastname"
              required
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Birthday :
            <input
              type="date"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              placeholder="Enter birthday"
              required
            />
          </label>
          &nbsp;
          <label>
            Nationality :
            <select
              type="select"
              value={nationality}
              onChange={e => setNationality(e.target.value)}
            >
              <option value="">-- Please Select --</option>
              <option value={nationality.Thai}>Thai</option>
              <option value={nationality.Laos}>Laos</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <label>Gender :</label>
          <input
            type="checkbox"
            value={gender.Male}
            onChange={e => setGender(e.target.value)}
            placeholder="Enter gender"
          />
          Male
          <input
            type="checkbox"
            value={gender.Female}
            onChange={e => setGender(e.target.value)}
            placeholder="Enter gender"
          />
          Female
          <input
            type="checkbox"
            value={gender.Unisex}
            onChange={e => setGender(e.target.value)}
            placeholder="Enter gender"
          />
          Unisex
          <br></br>
          <br></br>
          <label>
            Mobile phone :
            <select
              type="text"
              value={mobilephone}
              onChange={e => setMobilephone(e.target.value)}
              required
            >
              <option value="">-- Please Select --</option>
              <option value="+66">+66</option>
              <option value="+67.">+67</option>
            </select>
          </label>
          &nbsp;-&nbsp;
          <input
            type="text"
            value={inputmobilephone}
            onChange={e => setInputMobilephone(e.target.value)}
            placeholder="Enter Mobilephone"
          />
          <br></br>
          <br></br>
          <label>
            Expected Salary :
            <input
              type="number"
              value={expectedsalary}
              onChange={e => setExpectedsalary(e.target.value)}
              placeholder="Enter Expected Salary"
              required
            />
          </label>
          <br></br>
          <br></br>
          <button type="submit" value="Submit">
            {isEdit ? <p>Update</p> : <p>Submit</p>}
          </button>
        </form>
      </div>
      <hr></hr>

      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Gender</td>
            <td>Mobilephone</td>
            <td>Nationality</td>
          </tr>
        </tbody>
      </table>
      {todos.map((todo, id) => {
        return (
          <div key={id}>
            <table>
              <tbody key={todo.id}>
                <tr>
                  <td>
                    {todo.title}
                    {todo.firstname} {todo.lastname}
                  </td>

                  <td>{todo.gender}</td>

                  <td>
                    {todo.mobilephone}
                    {todo.inputmobilephone}
                  </td>
                  <td>{todo.nationality}</td>

                  <td>
                    <button
                      onClick={() =>
                        edit(
                          todo.id,
                          todo.title,
                          todo.firstname,
                          todo.lastname,
                          todo.birthday,
                          todo.nationality,
                          todo.gender,
                          todo.mobilephone,
                          todo.inputmobilephone,
                          todo.expectedsalary
                        )
                      }
                    >
                      Edit
                    </button>
                    &nbsp; / &nbsp;
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

export default App;
