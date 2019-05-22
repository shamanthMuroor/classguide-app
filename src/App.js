import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Login from './components/Login';
import GuideStudents from './components/GuideStudents';
import Stafprofile from './components/Stafprofile';
import Meetings from './components/Meetings';
import Guidelines from './components/Guidelines';
import ErrorPage from './components/ErrorPage';
import myApp from './config.js';
import './styles/style.css';

export let db=myApp.firestore();

class App extends React.Component {
  render() {
    return (
      <div>
            <Router>
              <Navbar logout={this.handleLogout}/>
              <Switch>
                <Route path='/' exact component={Stafprofile} />
                <Route path='/guidestudents' exact component={GuideStudents} />
                <Route path='/meetings' exact component={Meetings} />
                <Route path='/guidelines' exact component={Guidelines} />
                <Route path='*' exact component={ErrorPage} />
              </Switch>
              <Footer/>
            </Router>
      </div>
    )
  }
}
export default App;
