import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function TaskForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let value = ev.target.type === 'checkbox' ? ev.target.checked : tgt.val();
    let data = {};
    data[tgt.attr('name')] = value;
    data["user_id"] = params.user;
    let action = {
      type: 'UPDATE_FORM',
      data: data,

    };
    params.dispatch(action);
  }

  function submit(ev) {
    api.submit_task(params.form, params.user, params.token);

  }
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}} className="container">
    <h2>New Task</h2>
    <FormGroup>
      {params.form.success.length === 0 ?  <div></div>:<div className="alert alert-success"> {params.form.success}</div>}
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>

      <Input type="text" placeholder="Enter a title for your task." name="title" value={params.form.title} onChange={update} />
      <Label for="title" className="text-danger">{params.form.error.title[0]}</Label>
    </FormGroup>
    <FormGroup>
      <Label for="Description">Description</Label>
      <Input type="textarea" placeholder="Enter some Description" name="description" value={params.form.description} onChange={update}  />
        <Label for="title" className="text-danger">{params.form.error.description[0]}</Label>
  </FormGroup>
    <FormGroup>
      <Label for="assigned_id">Assign to:</Label>
      <Input type="select"  name="assigned_id" value={params.form.assigned_id} onChange={update} >
        <option value="" disabled defaultValue hidden> Please select an Assignee</option>
        { users }
      </Input>
        <Label for="title" className="text-danger">{params.form.error.assigned_id[0]}</Label>
    </FormGroup>
    <FormGroup>
      <Label for="timetrack">Time</Label>
      <Input type="number" step="15" placeholder="Enter time in 15 minute intervals" name="timetrack" value={params.form.timetrack} onChange={update}  />
        <Label for="title" className="text-danger">{params.form.error.timetrack[0]}</Label>
  </FormGroup>
    <FormGroup check>
      <Label check for="completed">
      <Input type="checkbox" name="completed" checked={params.form.completed} onChange={update} />{' '}
      Completed</Label>
    </FormGroup>

    <Button onClick={submit}>Create task</Button>
  </div>;
}
function state2props(state, props) {
  return { form: state.form, users: state.users, token: state.token.token  };
}

// Export the result of a curried function call.
export default connect(state2props)(TaskForm);
