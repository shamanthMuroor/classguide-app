import React from 'react';
import '../styles/login.css';


class Login extends React.Component {
  // state = {
  //   user: false,
  //   name: '',
  //   password: ''
  // }

  // changeName = (event) => {
  //   this.setState({ name: event.target.value });
  // }

  // changePassword = (event) => {
  //   this.setState({ password: event.target.value });
  // }

  // }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 img">
            <img src="https://www.sac-aimit.in/epitome/images/aloylogo.png" id="logo" alt="" />
            <img src="http://staloysiuscollege.co.in/newDesign/images/about-aloysius.png" id="bg-img" alt="" />
          </div>
          <div className="col-md-4 text-justify">
            <div className="form-login">
              <h4 className="">Login</h4>
              <input
                type="text"
                id="userName"
                className="form-control"
                placeholder="username"
                onChange={this.changeName} />
              <input
                type="text"
                id="userPassword"
                className="form-control"
                placeholder="password"
                onChange={this.changePassword} />
              <div className="wrapper text-center">
                <span>
                  <button className="btn" onClick={this.props.login}>Login<i className="fa fa-sign-in"></i></button>
                  {/* <Link exact="true" to="/" className="btn btn-primary">login <i className="fa fa-sign-in"></i></> */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
