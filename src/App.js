import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                    Hello
                </Router>
            </div>
        )
    }
}
export default App;