import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { Link } from 'react-router-dom';


function Register(props) {
  function update(ev) {
    let tgt = $(ev.target);
    let value = ev.target.type === 'checkbox' ? ev.target.checked : tgt.val();
    let data = {};
    data[tgt.attr('name')] = value;
    let action = {
      type: 'REGISTER_USER',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    api.register_user(props.register);
  }

  return <div style={{padding: "4ex"}} className="container">
    <h2>Register: </h2>
    {props.register.msg? <div className="alert alert-success"> {props.register.msg}</div>:<div></div>}
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="text" name="name" value={props.register.name} onChange={update} />

    </FormGroup>
    <FormGroup>
      <Label for="password">Password:</Label>
      <Input type="password" name="password" value={props.register.password} onChange={update} />
    </FormGroup>


    <Link to={"/"}>
      <Button color="info">  Back to Login</Button>
    </Link>{' '}
    <Button onClick={submit}>Submit</Button>{' '}


  </div>;
}
function state2props(state) {
  return { register: state.register };
}

export default connect(state2props)(Register);
