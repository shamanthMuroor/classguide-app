import React from 'react';
import {Link} from 'react-router-dom';

class SomethingsWrong extends React.Component {
  render() {  
    return ( 
      <div className="card text-center" style={{margin:'100px'}}>
        <div className="card-body" style={{padding: "50px"}}>
          <i className="fas fa-exclamation-triangle fa-5x mb-4"></i>
            <h1 className="text-monospace">Oops!</h1>
            <p>Sorry, Something went wrong</p>
            <p> Go back to
                <Link to='/'> <b style={{fontSize:"2em", color:"#333333", textDecoration:"underline"}}>Home?</b> </Link>
            </p>
        </div>
      </div>
    )
  }
}


export default SomethingsWrong;