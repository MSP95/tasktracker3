import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Task(params) {

  let task = params.task;
  return <div className="container pt-2"><Card outline color="dark" >
    <CardHeader>
      <div className="float-left">
        Created by <b>{ task.user.name }</b>
    </div>
    {params.user === task.user.id || params.user === task.assigned.id ? <div className="float-right">
      <Link to={"/task-edit/" + task.id}>
        <Button color="primary"> Update</Button>
      </Link>

    </div>:<div></div>}
  </CardHeader>
  <CardBody>
    <div>
      <p> <b>Title:</b> { task.title } </p>
      <p> <b>Description:</b> { task.description }</p>
      <p>Assigned to: <b>{ task.assigned.name }</b> </p>
      <p>Completed?: <b>{ task.completed.toString() }</b> </p>
      <p>Time taken: <b>{ task.timetrack } minutes</b> </p>

    </div>
  </CardBody>
</Card></div>;
}
