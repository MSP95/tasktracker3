import store from './store';

class TheServer {

  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_task(data, user_id, token) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: token, "task": Object.assign({}, data, {"user_id": user_id}) }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'SET_CREATE_TASK_ERROR',
          error: resp.responseJSON,
        });
      },
    });
  }
  update_task(data, token, id) {

    $.ajax("/api/v1/tasks/" + data.id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: token, "task": data, "id": id }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_TASK',
          task: resp.data,
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'UPATE_TASK_ERROR',

        });
      },
    });
  }

  register_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({"user": data}),
      success: (resp) => {
        store.dispatch({
          type: 'AFTER_REGISTER',
          msg: "successfully created user",
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'SET_REGISTER_ERROR',
          error: "Invalid username/password",
        });
      },
    });
  }
  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'SET_LOGIN_ERROR',
          error: resp.responseJSON.errors,
        });
      },
    });
  }
}

export default new TheServer();
