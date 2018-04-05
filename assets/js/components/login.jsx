import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { Link } from 'react-router-dom';


function Login(props) {
  function update(ev) {
    let tgt = $(ev.target);
    let value = ev.target.type === 'checkbox' ? ev.target.checked : tgt.val();
    let data = {};
    data[tgt.attr('name')] = value;
    let action = {
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_login(props.login);
  }

  return <div style={{padding: "4ex"}} className="container">
    <h2>Login: </h2>
    {props.login.error? <div className="alert alert-danger"> {props.login.error}</div>:<div></div>}
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="text" name="name" value={props.login.name} onChange={update} />

    </FormGroup>
    <FormGroup>
      <Label for="password">Password:</Label>
      <Input type="password" name="pass" value={props.login.pass} onChange={update} />
    </FormGroup>


    <Button onClick={submit}>Login</Button>{' '}
      <Link to={"/register"}>
        <Button color="info"> Register</Button>
      </Link>

  </div>;
}
function state2props(state) {
  return { login: state.login };
}

// Export the result of a curried function call.
export default connect(state2props)(Login);
