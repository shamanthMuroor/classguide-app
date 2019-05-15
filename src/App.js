import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './style.css'
import Navbar from './components/Navbar';
import Stafprofile from './components/Stafprofile'


class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                </Router>

                <Stafprofile/>
                
            </div>
        )
    }
}
export default App;