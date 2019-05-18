import React from 'react';
<<<<<<< HEAD
import '../styles/login.css';
=======
>>>>>>> login


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
<<<<<<< HEAD
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
=======
        <div className="login-container">
            <div className="logo-container">
                <div className="login-desktop-container">
                <img src={this.props.logoImg} alt="logo" />
                <div className="form-container" id="form-desktop">
                    <form>
                        <div className="form-group">
                            <input type="name" className="form-control" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">login</button>
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
                    <button type="submit" className="btn btn-primary">login</button>
                </form>
>>>>>>> login
            </div>
        </div>
<<<<<<< HEAD
      </div>
=======
      
>>>>>>> login
    )
  }
}

export default Login
