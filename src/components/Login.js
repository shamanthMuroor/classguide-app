import React from 'react';
import '../styles/login.css';

class Login extends React.Component {
  render() {
    return (
      <div>
          <div className="align-center container">
         <div className="row justify-content-center">
             <div className="col-md-offset-5 col-md-3">
                 <div className="form-login">
                 <h4>Login</h4>
                 <input type="text" id="userName" className="form-control input-sm chat-input" placeholder="username" />
                 <br/>
                 <input type="text" id="userPassword" className="form-control input-sm chat-input" placeholder="password" />
                 <br/>
                 <div className="wrapper">
                 <span className="group-btn">     
                     <a href="#" className="btn btn-primary btn-md">login <i className="fa fa-sign-in"></i></a>
                 </span>
                 </div>
                 </div>
             </div>
         </div>
     </div>
      </div>
    )
  }
}

export default Login;
