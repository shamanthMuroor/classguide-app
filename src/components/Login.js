import React from 'react';
import '../styles/login.css';

class Login extends React.Component {
  render() {
    return ( 
      <div>
      <div class="container-fluid">
        <img src="http://staloysiuscollege.co.in/newDesign/images/about-aloysius.png" id="bg-img" alt="" />
        <div class="container">
            <img src="https://www.sac-aimit.in/epitome/images/aloylogo.png" width="20px" id="logo" alt="" />
        </div>
      </div>

      <div>
        <div className="align-center container">
          <div className="row justify-content-center">
              <div className="form-login">
                <h4>Login</h4>
                <input type="text" id="userName" className="form-control input-sm chat-input" placeholder="username" />
                <br/>
                <input type="text" id="userPassword" className="form-control input-sm chat-input" placeholder="password" />
                <br/>
                <div className="wrapper">
                  <span className="group-btn">     
                    <Link path to="#" className="btn btn-primary btn-md">login <i className="fa fa-sign-in"></i></Link>
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
