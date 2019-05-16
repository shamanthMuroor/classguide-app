import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './styles/style.css'
import Navbar from './components/Navbar';
import Login from './components/Login';
import GuideStudents from './components/GuideStudents';
import Stafprofile from './components/Stafprofile';
import Meetings from './components/Meetings';
import ErrorPage from './components/ErrorPage';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);

export let auth=firebase.auth();
export let storage=firebase.storage();
export let db=firebase.firestore();  
export let googleProvider = new firebase.auth.GoogleAuthProvider();


class App extends React.Component {
  state = {
    user: false,
    name: '',
    pass: ''
  }

  componentWillMount = () => {
    auth.onAuthStateChanged((user) => {
      if(user)
        this.setState({user})
      else
        this.setState({user: false})
    })  
  }
    
      handleAuth = () => {
        auth.signInWithPopup(googleProvider)
          .then(user => this.setState({user}))
          .catch(err => console.log(err));
        // db.collection("login").get()
        //   .then((val) => {
        //     let arr= [];
        //     val.forEach((value) => {
        //       arr.push({
        //         ...value.data()
        //       })
        //           // console.log(...value.data().username);
        //           let i;
        //       for(i=0; i<arr.length ; i++)
        //       {
        //           console.log(arr[i])
        //         if(this.state.name == arr[i])
        //         {
        //           if(this.state.pass == value.data().password)
        //             this.setState({user: true})
        //           else
        //             console.log("Wrong Password");
        //         }
        //       }
        //     })
        //     if(!this.state.user)
        //       console.log("Username doesn't exist");
        //   })
        //   .catch(err => console.log(err))
      }
    
      handleLogout = () => {
        auth.signOut()
          .then(() => this.setState({user: false}))
          .catch(err => console.log(err));
      }

    render() {
        return (
            <div>                   
              { this.state.user
              ?
              (
                <Router>
                    <Navbar logout={this.handleLogout}/>
                        <Switch>                             
                          <Route path='/' exact component={Stafprofile} />  
                          <Route path='/guidestudents' exact component={GuideStudents} />
                          <Route path='/meetings' exact component={Meetings} />
                          <Route path='*' exact component={ErrorPage} />
                        </Switch>
                </Router>
              )
              :
              (
                <Login user={this.state.user} login={this.handleAuth}/>
              )
              }
            </div>
        )
    }
}
export default App;
