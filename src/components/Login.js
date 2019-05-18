import React from 'react';
import '../styles/login.css';
import loginimg from '../images/login.png';
import logo from '../images/logo.png';

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
      <div className="login-container">
        <div className="logo-container">
          <div className="login-desktop-container">
            <img src={logo} alt="logo" />
            <div className="form-container" id="form-desktop">
              <form>
                <div className="form-group">
                  <input type="name" className="form-control" placeholder="Username" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={loginimg}>login</button>
              </form>
            </div>

          </div>


        </div>
        <div className="form-container" id="form-mobile">
          <form>
            <div className="form-group">
              <input type="name" className="form-control" placeholder="Username" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={loginimg}>login</button>
          </form>
        </div>
      </div>

    )
  }
}

export default Login;
