import React from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';  
import logo from '../../images/aloylogo.png'; 
import { auth } from '../../App'
    
const hidenav = () =>{
    document.getElementById('menuToggler').className="navbar-collapse collapse topnav";
}

class Navbar extends React.Component {
    state = {
        user: false
    }

    componentDidMount = () => {
        auth.onAuthStateChanged((usr) => {
            if (usr) {
                this.setState({ user: true })
            }
        })
    }

    handleStaffLogout = () => {
        auth.onAuthStateChanged((usr) => {
			if (usr) {
				auth.signOut()
                this.setState({ user: false })
			}
        })
		this.props.history.push('/login')
    }


    // handleStaffLogout = () => {
	// 	localStorage.removeItem("staffAuth");
	// 	this.props.history.push('/login')
	// }

    render() {
        return (
            <nav className="navbar fixed-top navbar-dark navbar-expand-lg" style={{ backgroundColor: '#333333' }}>           
                <button 
                    className="navbar-toggler border-0 " 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#menuToggler" 
                    aria-controls="menuToggler" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation" 
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                {/* Action for Menu toggler */}
                <div className="collapse navbar-collapse" id="menuToggler">
                    <Link className="navbar-brand d-none d-lg-flex" to="/">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="College Logo" />
                        SAC
                    </Link>
                    <ul className="navbar-nav mt-2 mt-lg-0" onClick={hidenav}>
                        <li className="nav-item">
                            <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/">
                                <i className="fas fa-home"></i> 
                                HOME 
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/students" style={{padding:'0.7rem'}}>
                                STUDENT DETAILS
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link dropdown-toggle" id="navbarDropdown1" role="button" data-toggle="dropdown" exact to="#">
                                <span>MEETINGS</span>
                            </NavLink>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown1"
                                style={{ backgroundColor: '#333333', border: 'none' }}
                            >
                                <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/class-meetings" style={{ color: 'rgba(255,255,255,.5)' }}>
                                    CLASS MEETINGS
                                </NavLink>
                                <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/parent-meetings" style={{ color: 'rgba(255,255,255,.5)' }}>
                                    PARENT MEETINGS
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link dropdown-toggle" id="navbarDropdown2" role="button" data-toggle="dropdown" exact to="#">
                                <span>PROGRAMS ORGANISED</span>
                            </NavLink>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown2"
                                style={{ backgroundColor: '#333333', border: 'none' }}
                            >
                                <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/counselling" style={{ color: 'rgba(255,255,255,.5)' }}>
                                    Career Guidance Counselling
                                </NavLink>
                                <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/ve-session" style={{ color: 'rgba(255,255,255,.5)' }}>
                                    VE-Sessions
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="selected" className="nav-link" exact to="/slow-learners" style={{padding: '0.7rem'}}>
                                SLOW LEARNERS
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link dropdown-toggle" id="navbarDropdown3" role="button" data-toggle="dropdown" exact to="#">
                                <span>ACHIEVERS</span>
                            </NavLink>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown3" style={{backgroundColor: '#333333', border: 'none'}}>
                                <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/academic-achievers" style={{color: 'rgba(255,255,255,.5)', fontSize: '14px'}}>
                                    Academic Achievers
                                </NavLink>
                                <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/achievers-levels" style={{color: 'rgba(255,255,255,.5)', fontSize: '14px'}}>
                                    Achievers (National,State level)
                                </NavLink>
                                <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/non-academic-achievers" style={{color: 'rgba(255,255,255,.5)', fontSize: '14px'}}>
                                    Non Academic Achievers
                                </NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="selected" className="nav-link" exact to="/rural" style={{padding: '0.7rem'}}>
                                RURAL STUDENTS
                            </NavLink>
                        </li>
                    </ul>   
                </div>
    
                <Link className="d-lg-none colgLogo" exact="true" to="/">
                    <img src={logo} width="50px" height="50px" className="d-inline-block align-middle" alt="College Logo" />
                    SAC
                </Link>
    
                <ul className="mb-0 dp">
                    <li className="nav-item dropdown">
                        <Link className="nav-link" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  style={{padding:'5px'}}>
                            <i className="fas fa-user-circle fa-2x"></i>
                        </Link>
                        <div className="dropdown-menu dropDownLinks" aria-labelledby="navbarDropdownMenuLink">
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Disabled">
                                <NavLink className="nav-link disabled" exact to="#" aria-disabled="true" style={{fontSize: '14px'}}>
                                    Notifications <span className="badge badge-secondary">0</span>
                                </NavLink>
                            </span>
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Coming Up">
                                <NavLink className="nav-link disabled" exact to="#" aria-disabled="true" style={{fontSize: '14px'}}>
                                    Sahaaya
                                </NavLink>
                            </span>
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Coming Up">
                                <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/reports" style={{fontWeight: '600'}}>
                                    Reports
                                </NavLink>
                            </span>                        
                            <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/guidelines" style={{fontWeight: '600'}}>
                                Guidelines
                            </NavLink>
                            <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/feedback" style={{fontWeight: '600'}}>
                                Feedback
                            </NavLink>
                            <hr className="m-1 mx-3" style={{backgroundColor: '#F5F2F2', opacity:'0.15'}}/>
                            <Link className="nav-link" exact="true" to="#" onClick={this.handleStaffLogout} style={{fontWeight: '600'}}>
                                Logout
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}

const NavStyle ={
    color: 'white',
    fontSize: '18px'
}


export default withRouter(Navbar);