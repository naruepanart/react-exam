import { createStore } from "redux";
import uuid from "uuid/v4";

const initialState = {
  todos: [
    {
      id: uuid(),
      name: "AAAAAAAAAAAAA"
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
            todo.name = action.name;
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

export const editTodoAction = (id, name) => ({
  type: "EDIT_TODO",
  payload: id,
  name: name
});

export const deleteTodoAction = id => ({
  type: "DELETE_TODO",
  payload: id
});