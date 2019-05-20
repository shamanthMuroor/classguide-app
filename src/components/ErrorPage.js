import React from 'react';
import './ErrorPage.css'


class ErrorPage extends React.Component {
  render() {  
    return ( 
      <div className="container card profile" style={{backgroundColor:'#333333',color:'darkgray',textAlign:'center'}}>
        <div className="card-body">
            <h1 className="text-flicker-in-glow text-monospace">404 Error</h1>
            <p className="">Sorry, we can’t seem to find what you’re looking for. </p>
        </div>
      </div>
    )
  }
}

export default ErrorPage;
