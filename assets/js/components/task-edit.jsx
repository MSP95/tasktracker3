import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function TaskEdit(params) {

  function update(ev) {
    let tgt = $(ev.target);
    let value = ev.target.type === 'checkbox' ? ev.target.checked : tgt.val();
    let data = {};
    data[tgt.attr('name')] = value;
    data["id"] = params.form.id;
    data["user_id"] = params.user;
    let action = {
      type: 'EDIT_FORM',
      data: data,
    };
    params.dispatch(action);
  }
  function submit0(ev) {
    if (params.edit_task){


      api.update_task(params.edit_task, params.token, params.form.id);
    }
  }
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}} className="container">
    <h2>Edit Task</h2>

    <FormGroup>
      <p>Creator: {params.form.user.name}</p>
    </FormGroup>
    <FormGroup>
      <Label for="Title">Title</Label>
      <Input type="text" name="title" defaultValue={params.form.title} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="Description">Description</Label>
      <Input type="textarea" name="description" defaultValue={params.form.description}  onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="assigned_id">Assign to:</Label>
      <Input type="select" name="assigned_id" defaultValue={params.form.assigned.id}  onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="timetrack">Time</Label>
      <Input type="number" placeholder="Enter time in 15 minute intervals" step="15" name="timetrack" defaultValue={params.form.timetrack}  onChange={update} />
    </FormGroup>
    <FormGroup check>
      <Label check for="completed">
        <Input type="checkbox" name="completed" defaultChecked={params.form.completed} onChange={update} />{' '}
          Completed</Label>
      </FormGroup>

      <Button onClick={submit0}>Update task</Button>
    </div>;
  }
  function state2props(state, props) {


    return { edit_task: state.edit_task, token: state.token.token};
  }


  // Export the result of a curried function call.
  export default connect(state2props)(TaskEdit);
