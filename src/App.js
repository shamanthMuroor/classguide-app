import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateStaffRoute from './components/PrivateStaffRoute';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer';
import Login from './components/Login';
import Students from './components/Students';
import Stafprofile from './components/Stafprofile';
import ClassMeetings from './components/ClassMeetings';
import ParentMeetings from './components/ParentMeetings';
import Guidelines from './components/general/Guidelines';
import StudProfile from './components/students/StudProfile';
import Counselling from './components/features/counselling/Counselling';
import SlowLearners from './components/features/slowLearner/SlowLearners';
import Achiever from './components/features/achievers/Achiever';
import Rural from './components/features/rural/Rural';
import Feedback from './components/general/Feedback';
import SomethingsWrong from './components/general/SomethingsWrong';
import ErrorPage from './components/general/ErrorPage';
import axios from 'axios';
import myApp from './config.js';
import './styles/style.css';

export let db=myApp.firestore();
export let host = "https://globaldb.sionasolutions.com";


// axios.post(`${host}/staff-login`,{username: 9845242258,password: "18.02.1973"})
//   .then((res) => {
//     console.log(res);
//     axios.get(`${host}/auth`,{
//       headers: {
//         'Authorization': res.data.token
//       }
//     }).then(res => {
//       console.log(res)
//     }).catch(err => console.log(err));
//   })  
//   .catch(err => console.log(err))

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
                <Route path='/students' exact component={Students} />
                <Route path='/class-meetings' exact component={ClassMeetings} />
                <Route path='/parent-meetings' exact component={ParentMeetings} />
                <Route path='/guidelines' exact component={Guidelines} />
                <Route path='/students/student-profile/:name' exact component={StudProfile} />
                <Route path='/counselling' exact component={Counselling} />
                <Route path='/slow-learners' exact component={SlowLearners} />
                <Route path='/achievers' exact component={Achiever} />
                <Route path='/rural' exact component={Rural} />
                <Route path='/feedback' exact component={Feedback} />
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
