import React from 'react';
import jwt_decode from 'jwt-decode';

class Stafprofile extends React.Component {
  state = {
    user: false
  }
  componentWillMount = () => {
    let val = JSON.parse(localStorage.getItem("staffAuth"))
    this.setState({user: jwt_decode(val.token)})
  }
  
  getYear() {
    return new Date().getFullYear();
  }
  render() {
    const { name , dob, role } = this.state.user;
    return (  
      <div className="container card shadow-lg p-3 mb-5 profile">
        <div className="card-body" style={{height: '350px'}}>
          <div className="profilepic">
            <i className="fas fa-user-circle fa-4x"></i>
          </div>
          <div className="text-center">
            <h4>{name}</h4>
            <hr/>
            <h6>DOB: {dob}</h6>
          </div>
          <div className="text-center bg-transparent card-footer text-muted">
            {this.getYear()}-{this.getYear()+1}
          </div>
        </div>	       
      </div>
    )
  }
}

export default Stafprofile;
