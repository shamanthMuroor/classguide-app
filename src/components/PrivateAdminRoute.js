import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { auth } from '../App';

class PrivateAdminRoute extends React.Component {  
    state = {
      user: false,
      done: false
    }
    
    componentWillMount = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({user: true, done: true})
        } else {
          this.setState({user: false, done: true})
        }
      })
    }

    componentWillUnmount = () => {
      this.setState({user: false, done: false})
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

export default PrivateAdminRoute;