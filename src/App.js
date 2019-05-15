import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './style.css'
import Navbar from './components/Navbar';
import StudDetails from './components/StudDetails';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
7
const firebaseConfig = {
    apiKey: "AIzaSyB7pv2G_wvp1Nnb9_Ql48xDsC6nPYTGrvE",
    authDomain: "class-guide-system.firebaseapp.com",
    databaseURL: "https://class-guide-system.firebaseio.com",
    projectId: "class-guide-system",
    storageBucket: "class-guide-system.appspot.com",
    messagingSenderId: "252911290527",
    appId: "1:252911290527:web:c91326363afcce28"
  };
firebase.initializeApp(firebaseConfig);

export let db=firebase.firestore();

import Stafprofile from './components/Stafprofile'


class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                        <Switch>                        
                            <Route path='/studentDetails' exact component={StudDetails} />
                        </Switch>
                </Router>

                <Stafprofile/>
                
            </div>
        )
    }
}
export default App;