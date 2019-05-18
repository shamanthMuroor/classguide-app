import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/style.css'
import Navbar from './components/Navbar';
import GuideStudents from './components/GuideStudents';
import Stafprofile from './components/Stafprofile';
import Meetings from './components/Meetings';
import Guidelines from './components/Guidelines';
import ErrorPage from './components/ErrorPage';
import firebase from 'firebase/app';
import myApp from './config.js';
import Login from './components/Login';
import './styles/style.css';
import logo from './images/logo.png';
import loginimg from './images/login.png';


export let auth=myApp.auth();
export let storage=myApp.storage();
export let db=myApp.firestore();
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
  }

  handleLogout = () => {
    auth.signOut()
      .then(() => {
        this.setState({user: false})
      })
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
                <Route path='/guidelines' exact component={Guidelines} />
                <Route path='*' exact component={ErrorPage} />
              </Switch>
            </Router>
          )
          :
          (
            <Login 
              loginImg={loginimg} 
              logoImg={logo} 
              user={this.state.user} 
              login={this.handleAuth}
            />
          )
        }
      </div>
    )
  }
}
export default App;
