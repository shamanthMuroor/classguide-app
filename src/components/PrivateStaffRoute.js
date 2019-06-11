import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import axios from 'axios';
import {host} from '../App';

class PrivateStaffRoute extends React.Component {  
    state = {
      user: false,
      done: false
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
                await this.setState({user: true,done: true})
          })
          .catch(async err => {
              // console.log(err.response);
              if(err.response.status === 401) {
                await this.setState({user: false,done: true}) 
                localStorage.removeItem("staffAuth");
              }
          });
      } else {
        localStorage.removeItem("staffAuth"); 
        this.setState({user: false,done: true})
      }
    }
    render() { 
      return(
        <div>
          {this.state.done &&
            <Route
              path={this.props.path}
              exact
              render={() => 
                this.state.user
                ?
                (
                  <this.props.component />
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