import React from 'react';
import logo from '../images/logo.png';
import { db } from '../App'

class Login extends React.Component {
  state = {
    showAdmin: false,
    username: '',
    password: ''
  }
//   componentWillMount = () => {
    
//     localStorage.removeItem("admin");
//     //     if(localStorage.admin) {
// //       this.props.history.push("/admin")
//     }  
// //   }
  onSubmit = (e) => {
    e.preventDefault();
    console.log("came in")
    db.collection('admin').get()
        .then(value => {
          value.forEach(val => {
            if(val.data().username === this.state.username && val.data().password === this.state.password)
            {
                // localStorage.setItem("admin",JSON.stringify(val.data()));   
                alert("logged in");
                this.props.history.push("/")
            }
            else 
                console.log("wrong password")
          })
        })
        .catch(err => console.log(err))
  }

//   adminSubmit = (e) => {
//     e.preventDefault();
//     if(this.state.username==="admin" && this.state.password==="admin")
//     {
//       alert("logged in");
//       this.props.history.push("/admin")
//     }
//   }

  render() {
    //  let staff = 

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
        //         <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Admin login</button>
        //       </form>
        //     </div>
        //   </div>
        // </div>

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
                  onChange={(e) => this.setState({username: e.target.value})} />
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
