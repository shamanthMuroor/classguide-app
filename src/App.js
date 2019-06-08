import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateStaffRoute from './components/PrivateStaffRoute';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer';
import Login from './components/Login';
import Students from './components/Students';
import Stafprofile from './components/Stafprofile';
import ClassMeetings from './components/ClassMeetings';
import ParentMeetings from './components/ParentMeetings';
import Guidelines from './components/general/Guidelines';
import Counselling from './components/features/counselling/Counselling';
import SlowLearners from './components/features/slowLearner/SlowLearners';
import Achiever from './components/features/achievers/Achiever';
import Rural from './components/features/rural/Rural';
import Feedback from './components/general/Feedback';
import AdminPanel from './components/AdminPanel';
import SomethingsWrong from './components/general/SomethingsWrong';
import ErrorPage from './components/general/ErrorPage';
import myApp from './config.js';
import './styles/style.css';

export let db=myApp.firestore();
export let auth=myApp.auth();
export let host = "https://globaldb.sionasolutions.com";

class App extends React.Component {
  handleLogout = () => {
    localStorage.removeItem("staffAuth");
    this.props.history.push('/login')
  }
  
  render() {
    return (
      <React.Fragment>
            <Router>
              <Navbar logout={this.handleLogout}/>
              <Switch>
                <Route path='/login' exact component={Login} />
                <PrivateStaffRoute path='/' exact component={Stafprofile} />
                <PrivateStaffRoute path='/students' exact component={Students} />
                <PrivateStaffRoute path='/class-meetings' exact component={ClassMeetings} />
                <PrivateStaffRoute path='/parent-meetings' exact component={ParentMeetings} />
                <PrivateStaffRoute path='/guidelines' exact component={Guidelines} />
                <PrivateStaffRoute path='/counselling' exact component={Counselling} />
                <PrivateStaffRoute path='/slow-learners' exact component={SlowLearners} />
                <PrivateStaffRoute path='/achievers' exact component={Achiever} />
                <PrivateStaffRoute path='/rural' exact component={Rural} />
                <PrivateStaffRoute path='/feedback' exact component={Feedback} />                
                <PrivateAdminRoute path='/admin' exact component={AdminPanel} />
                <Route path='/error' exact component={SomethingsWrong} />
                <Route path='*' exact component={ErrorPage} />
              </Switch>
              <Footer/>
            </Router>
      </React.Fragment>
    )
  }
}
export default App;

// username: 9845242258,password: "18.02.1973"
