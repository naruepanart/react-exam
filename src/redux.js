import { createStore } from "redux";
import uuid from "uuid/v4";

const initialState = {
  todos: [
    {
      id: uuid(),
      title: "Mr.",
      firstname: "aaaaaaaaaa",
      lastname: "bbbbbbbbb",
      birthday: "2001-05-01",
      nationality: "Thai",
      gender: "Male",
      mobilephone: "+66",
      inputmobilephone: "0812345678",
      expectedsalary: "25000"
    }
  ]
};

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.payload === todo.id) {
            todo.title = action.title;
            todo.firstname = action.firstname;
            todo.lastname = action.lastname;
            todo.birthday = action.birthday;
            todo.nationality = action.nationality;
            todo.gender = action.gender;
            todo.mobilephone = action.mobilephone;
            todo.inputmobilephone = action.inputmobilephone;
            todo.expectedsalary = action.expectedsalary;
          }
          return todo;
        })
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

// Actions
export const addTodoAction = todo => ({
  type: "ADD_TODO",
  payload: todo
});

export const editTodoAction = (
  todoId,
  title,
  firstname,
  lastname,
  birthday,
  nationality,
  gender,
  mobilephone,
  inputmobilephone,
  expectedsalary,
) => ({
  type: "EDIT_TODO",
  payload: todoId,
  title: title,
  firstname: firstname,
  lastname: lastname,
  birthday: birthday,
  nationality: nationality,
  gender: gender,
  mobilephone: mobilephone,
  inputmobilephone: inputmobilephone,
  expectedsalary: expectedsalary,
});

export const deleteTodoAction = todoId => ({
  type: "DELETE_TODO",
  payload: todoId
});
