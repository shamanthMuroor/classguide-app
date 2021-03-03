import React from 'react';
// import jwt_decode from 'jwt-decode';
import { auth } from '../App';
import { db } from '../App';

class Stafprofile extends React.Component {
  state = {
    user: false
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((usr)=> {
      if(usr) {
        this.setState({user: true})
      }
    })
    db.collection('staffData').doc('5cef889e91c2fe210298755c').get()
      .then(res => {
        if(!res.exists) {
          console.log("no doc")
        }
        else {
          this.setState({user: res.data()})
          // console.log("document data: ", res.data())
        }
      })
  }

  // componentWillMount = () => {
  //   if(localStorage.staffAuth) {
  //     let val = JSON.parse(localStorage.getItem("staffAuth"))
  //     this.setState({user: jwt_decode(val.token)})
  //   }
  //   else
  //     this.props.history.push('/error')
  // }
  
  getYear() {
    return new Date().getFullYear();
  }

  render() {
    // const { name , dob } = this.state.user;
    const name = this.state.user.name;
    const dob = this.state.user.dob;

    let html =
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
    return (  
      <React.Fragment>
        {html}
      </React.Fragment>
    )
  }
}

export default Stafprofile;
