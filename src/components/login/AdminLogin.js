import React from 'react';
import logo from '../../images/logo.png';
import { auth } from '../../App'

class Login extends React.Component {
  state = {
    showAdmin: false,
    email: '',
    password: '',
  }

  onSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(()=> {
        console.log("logged in")
        this.props.pushVal();
      })
      .catch(err => {
        console.log(err)
        var errorCode = err.code;
        var errorMessage = err.message;
        console.log(errorMessage + " " + errorCode)
      })
  }

  render() {
    return(
      <div className="mt-5">
          <div className="login-container">
        <div className="logo-container">
          <div className="login-desktop-container">
            <img src={logo} alt="logo" />
            <div className="form-container" id="form-desktop">
              <form>
                <div className="form-group">
                  <input type="name" className="form-control" placeholder="Username"
                  onChange={(e) => this.setState({email: e.target.value})} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Password" 
                    onChange={(e) => this.setState({password: e.target.value})} />
                  />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Admin login</button>
              </form>
            </div>

          </div>

        </div>
      </div>
      </div>
    )
}
}

export default Login;
