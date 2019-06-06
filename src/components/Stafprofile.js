import React from 'react';
import jwt_decode from 'jwt-decode';

class Stafprofile extends React.Component {
  // componentWillMount = () => {
  //   let val = JSON.parse(localStorage.getItem("auth"))
  //   console.log(jwt_decode(val.token))
  // }
  getYear() {
    return new Date().getFullYear();
  }
  render() {
    return (  
      <div className="container card shadow-lg p-3 mb-5 profile">
        <div className="card-body" style={{height: '350px'}}>
          <div className="profilepic">
            {/* TODO - profile picture */}
            <i className="fas fa-user-circle fa-4x"></i>
          </div>
          <div className="text-center">
            <h3>John Snow</h3>
            <h4>MSc, PGDCA</h4>
            <h5>King in the north</h5>
            <h6>DOB: 12/12/677</h6>
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
