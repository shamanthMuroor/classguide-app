import React from 'react';
import logo from '../images/logo.png';
import AdminLogin from './AdminLogin'
import axios from 'axios';
import {host} from '../App';

class Login extends React.Component {
  state = {
    showAdmin: false,
    username: '',
    password: ''
  }
  componentWillMount = () => {
    if(localStorage.staffAuth) {
      this.props.history.push("/")
    }  
  }
  onSubmit = (e) => {
    e.preventDefault();
    // console.log("came in")
    axios.post(`${host}/staff-login`,{
      username: this.state.username,
      password: this.state.password
    }).then(value =>  {
        console.log(value)
        localStorage.setItem("staffAuth",JSON.stringify(value.data));
        alert("logged in");
        this.props.history.push("/")
      })
    .catch(err => console.log(err.response.msg));
  }

  adminSubmit = (e) => {
    e.preventDefault();
    if(this.state.username==="admin" && this.state.password==="admin")
    {
      alert("logged in");
      this.props.history.push("/admin")
    }
  }

  render() {
     let staff = <div className="login-container">
        <div className="logo-container">
          <div className="login-desktop-container">
            <img src={logo} alt="logo" />
            <div className="form-container" id="form-desktop">
              <form>
                <div className="form-group">
                  <input type="name" className="form-control" value={this.state.username} placeholder="Username"
                  onChange={(e) => this.setState({username: e.target.value})} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" value={this.state.username} placeholder="Password" 
                    onChange={(e) => this.setState({password: e.target.value})} />
                  />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>login</button>
              </form>
            </div>

          </div>

        </div>
        {/* <div className="form-container" id="form-mobile">
          <form>
            <div className="form-group">
              <input type="name" className="form-control" placeholder="Username" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.props.login}>login</button>
          </form>
        </div> */}
      </div>

        // let admin = 
        // <div className="logo-container">
        //   <div className="login-desktop-container">
        //     <img src={logo} alt="logo" />
        //     <div className="form-container" id="form-desktop">
        //       <form>
        //         <div className="form-group">
        //           <input type="name" className="form-control" placeholder="Username"
        //           onChange={(e) => this.setState({username: e.target.value})} />
        //         </div>
        //         <div className="form-group">
        //           <input type="password" className="form-control" placeholder="Password" 
        //             onChange={(e) => this.setState({password: e.target.value})} />
        //           />
        //         </div>
        //         <button type="submit" className="btn btn-primary" onClick={this.adminSubmit}>Admin login</button>
        //       </form>
        //     </div>
        //   </div>
        // </div>

    return(
      <div className="mt-5">
      <button onClick={()=>this.setState({showAdmin: true})}>Admin Login</button>
      <button onClick={()=>this.setState({showAdmin: false})}>Staff Login</button>
      { this.state.showAdmin ? <AdminLogin /> : staff }
      </div>
    )
}
}

export default Login;
