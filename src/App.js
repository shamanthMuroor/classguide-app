import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateStaffRoute from './components/PrivateStaffRoute';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import AdminPanel from './components/AdminPanel';
import Login from './components/login/Login';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer';
import Students from './components/Students';
import Stafprofile from './components/Stafprofile';
import ClassMeetings from './components/ClassMeetings';
import ParentMeetings from './components/ParentMeetings';
import Counselling from './components/features/counselling/Counselling';
import SlowLearners from './components/features/slowLearner/SlowLearners';
import AcadAchievers from './components/features/achievers/AcadAchievers';
import LevelAchievers from './components/features/achievers/LevelAchievers';
import NonAcadAchievers from './components/features/achievers/NonAcadAchievers';
import Rural from './components/features/rural/Rural';
import Guidelines from './components/general/Guidelines';
import Reports from './components/general/Reports';
import Feedback from './components/general/Feedback';
import SomethingsWrong from './components/general/SomethingsWrong';
import ErrorPage from './components/general/ErrorPage';
import myApp from './config.js';
import './styles/style.css';

export let db=myApp.firestore();
export let auth=myApp.auth();
export let host = "https://globaldb.sionasolutions.com";

class App extends React.Component {
  handleStaffLogout = () => {
        localStorage.removeItem("staffAuth");
        this.props.history.push('/login')
  }

  handleAdminLogout = () => {
    console.log('reached logout handle')
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.signOut()
      }
    })
    this.props.history.push('/login')
  }

  render() {
    return (
      <React.Fragment>
            <Router>
              <Navbar staffLogout={this.handleStaffLogout} adminLogout={this.handleAdminLogout} />
              <Switch>
                <Route path='/login' exact component={Login} />  
                <PrivateAdminRoute path='/admin' exact component={AdminPanel} />

                <PrivateStaffRoute path='/' exact component={Stafprofile} />
                <PrivateStaffRoute path='/students' exact component={Students} />
                <PrivateStaffRoute path='/class-meetings' exact component={ClassMeetings} />
                <PrivateStaffRoute path='/parent-meetings' exact component={ParentMeetings} />
                <PrivateStaffRoute path='/counselling' exact component={Counselling} />
                <PrivateStaffRoute path='/slow-learners' exact component={SlowLearners} />
                <PrivateStaffRoute path='/academic-achievers' exact component={AcadAchievers} />
                <PrivateStaffRoute path='/achievers-levels' exact component={LevelAchievers} />
                <PrivateStaffRoute path='/non-academic-achievers' exact component={NonAcadAchievers} />
                <PrivateStaffRoute path='/rural' exact component={Rural} />
                <PrivateStaffRoute path='/reports' exact component={Reports} />   
                <PrivateStaffRoute path='/feedback' exact component={Feedback} />             
                <Route path='/guidelines' exact component={Guidelines} />
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
