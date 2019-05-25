import React from 'react';
import logo from '../images/logo.png';

class Login extends React.Component {
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
                <button type="submit" className="btn btn-primary" onClick={this.props.login}>login</button>
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
            <button type="submit" className="btn btn-primary" onClick={this.props.login}>login</button>
          </form>
        </div>
      </div>

    )
  }
}

export default Login;
