import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer';
import Login from './components/Login';
import Students from './components/Students';
import Stafprofile from './components/Stafprofile';
import ClassMeetings from './components/ClassMeetings';
import ParentMeetings from './components/ParentMeetings';
import Guidelines from './components/general/Guidelines';
import ErrorPage from './components/general/ErrorPage';
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
                <Route path='/students' exact component={Students} />
                <Route path='/classmeetings' exact component={ClassMeetings} />
                <Route path='/parentmeetings' exact component={ParentMeetings} />
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
