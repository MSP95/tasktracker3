import React from 'react';
import ReactDOM from 'react-dom';



export default function tasktracker_init(root) {
  console.log("root", root);
  ReactDOM.render(<Hi />, root);
}

class Hi extends React.Component { 

  render(){
    return <div> react </div>
  }
}
