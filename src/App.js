import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/style.css'
import Navbar from './components/Navbar';
// import Login from './components/Login';
import GuideStudents from './components/GuideStudents';
import Stafprofile from './components/Stafprofile';
import Meetings from './components/Meetings';
import ErrorPage from './components/ErrorPage';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// const firebaseConfig = {
//   };
// firebase.initializeApp(firebaseConfig);

// export let auth=firebase.auth();
// export let storage=firebase.storage();
// export let db=firebase.firestore();  


class App extends React.Component {
    state = {
        user : false
    }

    render() {
        return (
            <div>
                <Router>
                    {/* <Login /> */}
                    <Navbar />
                        <Switch>                                                  
                            <Route path='/' exact component={Stafprofile} />  
                            <Route path='/guidestudents' exact component={GuideStudents} />
                            <Route path='/meetings' exact component={Meetings} />
                            <Route path='*' exact component={ErrorPage} />
                        </Switch>
                </Router>
                
            </div>
        )
    }
}
export default App;