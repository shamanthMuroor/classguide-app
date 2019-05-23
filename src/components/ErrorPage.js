import React from 'react';
import '../styles/ErrorPage.css'


class ErrorPage extends React.Component {
  render() {  
    return ( 
      <div className="container card" style={errPage}>
        <div className="card-body">
            <h1 className="text-flicker-in-glow text-monospace">404 Error</h1>
            <p>Sorry, we can’t seem to find what you’re looking for. </p>
        </div>
      </div>
    )
  }
}

export default ErrorPage;

const errPage = {
  backgroundColor:'#333333', 
  color:'darkgray', 
  textAlign:'center', 
  width: '25rem', 
  marginTop: '150px', 
  marginBottom: '120px', 
  padding: '50px'
}