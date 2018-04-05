import React from 'react';
import Task from './task';

export default function Assignments(params) {

  let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} user={params.user} task={pp} />);
  return <div>
    { tasks }
  </div>;
}
