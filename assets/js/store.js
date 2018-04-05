import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
*  state layout:
*  {
*   tasks: [... Tasks ...],
*   users: [... Users ...],
*   task-form: {
*     user_id: null,
*     title: "",
*     description: "",
*     assigned_id: null,
*     timetrack: 0,
*     completed: false,
*   token: {
        user_id: Number,
        token: String,
      }
*   }
* }
*
* */

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'LOGOUT':
        return null;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
  error: null,
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
      case 'SET_TOKEN':
        return action.token;
      case 'SET_LOGIN_ERROR':
        return {name: "", pass: "", error: action.error,};
    default:
      return state;
  }
}

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASKS_LIST':
    return [...action.tasks];
    case 'ADD_TASK':
    return [action.task, ...state];
    case 'UPDATE_TASK':
    return [action.task, ..._.reject(state, function(task){ return task.id == action.task.id })];
    default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USERS_LIST':
    return [...action.users];
    default:
    return state;
  }
}
let empty_register = {
  name: "",
  password: "",
  msg: null,
};
function register(state=empty_register, action) {
  switch (action.type) {
    case 'REGISTER_USER':
      return Object.assign({}, state, action.data);
      case 'AFTER_REGISTER':
        return {name: "", password: "", msg: action.msg};
      case 'SET_REGISTER_ERROR':
        return {name: "", password: "", msg: action.error};
    default:
      return empty_register;
  }
}

let empty_form = {
  success: "",
  user_id: "",
  title: "",
  description: "",
  assigned_id: "",
  timetrack: 0,
  completed: false,
  error: {title: "", description: "", assigned_id: "", timetrack: "", }
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
    return Object.assign({}, state, action.data, {success: ""});
    case 'ADD_TASK':
    return Object.assign({}, empty_form, {success: "Successfully created task!"});
    case 'SET_CREATE_TASK_ERROR':
    let c = Object.assign({}, empty_form.error, action.error.errors)

    return (
      Object.assign({}, empty_form, {error: c})
  );
    case 'SET_TOKEN':
      return Object.assign({}, state, {token: action.token.token});
    default:
    return state;
  }
}
function edit_task(state = null, action){
  switch (action.type) {
    case 'EDIT_FORM':
    return Object.assign({}, state, action.data);
    case 'UPDATE_TASK':
    return null;
    case 'UPDATE_TASK_ERROR':
    return null;
    default:
    return null;
  }
}

function root_reducer(state0, action) {
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, edit_task, token, login, register});
  let state1 = reducer(state0, action);
  console.log("ReduxState", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
