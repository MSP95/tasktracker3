import React from 'react';
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import { NavItem, Button } from 'reactstrap';



let Session = connect(({token})=>{return {token};})((props)=> {
  return <div className="navbar-text">
    Hi {props.token.user_name}! | <Link to={"/"} onClick={()=> props.dispatch({
      type: 'LOGOUT',})} size="sm">Log out</Link>
  </div>
});

function Nav(props) {

  let session_info;
  if (props.token)  {
    session_info = <Session token={props.token} />;
  }
  else{
    session_info = <div className="navbar-text">Hi Guest!</div>;
  }


  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Tasktracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/assignments"   href="#" className="nav-link">Assignments</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/task-form"  href="#" className="nav-link">Create New Task</NavLink>
        </NavItem>
      </ul>
      {session_info}
    </nav>
  );
}
function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
