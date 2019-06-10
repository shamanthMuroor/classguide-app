import React from 'react';
import logo from '../../images/logo.png';
import axios from 'axios';
import {host, auth} from '../../App';

class Login extends React.Component {
  state = {
    showAdmin: false,
    username: '',
    password: '',
    adminEmail: '',
    adminPassword: '',
    logging: false,
    error: false
  }
  componentWillMount = () => {
    if(localStorage.staffAuth) {
      this.props.history.push("/")
    }  
  }

  onAdminSubmit = (e) => {
      e.preventDefault();
    this.setState({error: false, logging: true})
    auth.signInWithEmailAndPassword(this.state.adminEmail, this.state.adminPassword)
      .then(()=> {
        console.log("logged in")
        this.setState({logging: false})
        this.props.history.push("/admin")
      })
      .catch(err => {
          this.setState({error: true, logging: false})
            console.log(err)
        } );
  }

  onStaffSubmit = (e) => {
    e.preventDefault();
    this.setState({error: false, logging: true})
    // console.log("came in")
    axios.post(`${host}/staff-login`,{
      username: this.state.username,
      password: this.state.password
    }).then(value =>  {
        // console.log(value)
        localStorage.setItem("staffAuth",JSON.stringify(value.data));
        this.setState({logging: false})
        this.props.history.push("/")
      })
    .catch(err => this.setState({error: true, logging: false}) );
  }

  render() {
    let admin = 
      <React.Fragment>
        <div>
          <div className="loginBackground">
            <div className="login-container">
              <img src={logo} alt="logo" />
              <div className="form-container">
                <form style={{marginBottom: '10px'}}>
                {this.state.error && <div className="alert alert-danger" role="alert" style={{padding:'7px'}}>
                        <i className="fas fa-exclamation-circle"></i> Invalid username or password
                    </div>}
                  <div className="form-group">
                    <input 
                      type="name" 
                      className="form-control" 
                      value={this.state.adminEmail} 
                      placeholder="Username"
                      autoFocus
                      autoComplete="on"
                      onChange={(e) => this.setState({ adminEmail: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="password" 
                      className="form-control" 
                      value={this.state.adminPassword} 
                      placeholder="Password"
                      autoComplete="on"
                      onChange={(e) => this.setState({ adminPassword: e.target.value })} 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.onAdminSubmit} disabled={this.state.logging}>
                    { this.state.logging ? "Logging in" : "Admin Login" }  
                    </button>
                </form>
                <div className="text-center">
                    <button 
                        className="btn-sm"
                        style={{background: 'none', border: 'none', color: 'gray'}}
                        onClick={()=>this.setState({showAdmin: !this.state.showAdmin})}
                    >
                        {this.state.showAdmin ? "Staff Login" : "Admin Login" }
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>

    let staff =
      <React.Fragment>
          <div className="loginBackground">
            <div className="login-container">
              <h5 style={{position: 'relative', textAlign: 'center', top: '-10px', color:'#F5F2F2', textShadow: '2px 2px #333333'}}>CLASS GUIDE SYSTEM</h5>
              <img src={logo} alt="logo" />
              <div className="form-container">
                <form style={{marginBottom: '10px'}}>
                    {this.state.error && <div className="alert alert-danger" role="alert" style={{padding:'7px'}}>
                        <i className="fas fa-exclamation-circle"></i> Invalid username or password
                    </div>}
                  <div className="form-group">
                    <input 
                      type="name" 
                      className="form-control" 
                      value={this.state.username} 
                      placeholder="Username"
                      autoFocus
                      autoComplete="on"
                      onChange={(e) => this.setState({ username: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="password" 
                      className="form-control" 
                      value={this.state.password} 
                      placeholder="Password"
                      autoComplete="on"
                      onChange={(e) => this.setState({ password: e.target.value })} 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.onStaffSubmit} disabled={this.state.logging}>
                    { this.state.logging ? "logging-in" : "login" }
                  </button>
                </form>
                <div className="text-center">
                    <button 
                        className="btn-sm"
                        style={{background: 'none', border: 'none', color: 'gray'}}
                        onClick={()=>this.setState({showAdmin: !this.state.showAdmin})}
                    >
                        {this.state.showAdmin ? "Staff Login" : "Admin Login" }
                    </button>
                </div>
              </div>
            </div>
          </div>
      </React.Fragment>

    return(
      <div>
      { this.state.showAdmin ? admin : staff }
      </div>
    )
}
}

export default Login;
