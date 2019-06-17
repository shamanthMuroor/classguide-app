import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import axios from 'axios';
import {host} from '../App';

class PrivateStaffRoute extends React.Component {  
    state = {
      user: false,
      done: false,
      loading: true
    }
    componentWillMount = async () => {
      if(localStorage.staffAuth) {
        let user = JSON.parse(localStorage.getItem("staffAuth"));
        // console.log(user.token);
        axios.get(`${host}/auth`,{
          headers:{
            'Authorization': user.token
          }
        })
          .then(async data => {
                // console.log(data)
                await this.setState({user: true,done: true, loading: false})
          })
          .catch(async err => {
              // console.log(err.response);
              // if(err.response.status === 401) {
                await this.setState({user: false,done: true}) 
                localStorage.removeItem("staffAuth");
              // }
          });
      } else {
        localStorage.removeItem("staffAuth"); 
        this.setState({user: false,done: true})
      }
    }
    render() { 
      return(
        <div>
          { 
            this.state.loading 
            && 
            <React.Fragment>
              <div className="d-md-none" style={{marginTop: '150px'}}></div>
              <h5 style={{marginTop: "15vw", textAlign:'center', padding: '5px'}}>
                Wait a moment while we load your app
              </h5>
              <div className="loader"></div>
            </React.Fragment>
          }
          {this.state.done &&
            <Route
              path={this.props.path}
              exact
              render={(props) => 
                this.state.user
                ?
                (
                  <this.props.component {...props} />
                )
                :
                (
                  <Redirect to="/login" />
                )
              }
            />
          }
        </div>   
      )
    }
  }

export default PrivateStaffRoute;