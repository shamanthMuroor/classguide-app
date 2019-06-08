import React from 'react';
import {Route,Redirect} from 'react-router-dom';

class PrivateAdminRoute extends React.Component {  
    state = {
      user: true
    }
    
    render() { 
      return(
        <div>
            <Route
              path='/admin'
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
        </div>   
      )
    }
  }

export default PrivateAdminRoute;