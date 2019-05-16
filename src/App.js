import React from 'react';
import Login from './components/Login';
import './styles/style.css';
import logo from './images/logo.png';
import login from './images/login.png';




class App extends React.Component {
   
    render() {
        return (
            <div>
                    
                 
               <Login loginImg={login} logoImg={logo}/>
                
            </div>
        )
    }
}
export default App;
