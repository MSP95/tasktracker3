import React from 'react';
import ReactDOM from 'react-dom';
// import { TransitionGroup, CSSTransition } from "react-transition-group";

import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Feed from './feed';
import Assignments from './assignments';
import TaskForm from './task-form';
import TaskEdit from './task-edit';
import Login from './login';
import Register from './register';


export default function tasktracker_init(root, store) {
  ReactDOM.render(<Provider store={store}><Tasktracker state={store.getState()}/></Provider>, root);

}

let Tasktracker = connect((state) => state)((props) => {
  let loginComp = props.token? <div></div>: <Login />;
return (<Router>
  <div>
    <Nav/>

    <Route path="/task-form" exact={true} render={() => <div>
        {loginComp}
        {props.token? <TaskForm user={parseInt(props.token.user_id)}/>:<div></div>}

      </div>
    }/>
  <Route path="/register" render={() => <div>

        <Register />

      </div>
    }/>

  <Route path="/task-edit/:task_id" exact={false} render={({match}) =><div>
      {loginComp}
      {props.token? <TaskEdit  form={_.filter(props.tasks, (pp) => match.params.task_id == pp.id)[0]
      } users={props.users} user={parseInt(props.token.user_id)} />:<div></div>}
    </div>
  }/>
  <Route path="/" exact={true} render={() => <div>
      {loginComp}
      {props.token? <Feed user={parseInt(props.token.user_id)} tasks={props.tasks}/>:<div></div>}
    </div>}/>
    <Route path="/assignments" exact={true} render={() =>
        <div>
          {loginComp}
          {props.token? <Assignments user={parseInt(props.token.user_id)} tasks={
            _.filter(props.tasks, (task) =>
            task.assigned.id == props.token.user_id )}/>:<div></div>}
          </div>
        }/>
      </div>
    </Router>);
  });
