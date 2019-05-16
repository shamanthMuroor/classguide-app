import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
          <div class="align-center container">
         <div class="row justify-content-center">
             <div class="col-md-offset-5 col-md-3">
                 <div class="form-login">
                 <h4>Login</h4>
                 <input type="text" id="userName" class="form-control input-sm chat-input" placeholder="username" />
                 </br>
                 <input type="text" id="userPassword" class="form-control input-sm chat-input" placeholder="password" />
                 </br>
                 <div class="wrapper">
                 <span class="group-btn">     
                     <a href="#" class="btn btn-primary btn-md">login <i class="fa fa-sign-in"></i></a>
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
