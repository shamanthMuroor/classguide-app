import React from 'react';
import {NavLink, Link} from 'react-router-dom';  
import logo from '../../images/aloylogo.png'; 
    
const hidenav = () =>{
    document.getElementById('menuToggler').className="navbar-collapse collapse topnav";
}

function Navbar(props) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark mainNav">           
            <button className="navbar-toggler border-0 " type="button" data-toggle="collapse" data-target="#menuToggler" aria-controls="menuToggler" aria-expanded="false" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Action for Menu toggler */}
            <div className="collapse navbar-collapse topnav" id="menuToggler">
                <Link className="navbar-brand d-none d-lg-flex" to="/">
                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="College Logo" />
                SAC
                </Link>
                <ul className="navbar-nav mt-2 mt-lg-0" onClick={hidenav}>
                    <li className="nav-item">
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/"><i className="fas fa-home"></i> Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/students">Student Details </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/class-meetings">Class Meetings</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/parent-meetings">Parent Meetings</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/counselling">Counselling</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/slow-learners">Slow Learners</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/achievers">Achievers</NavLink>
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
                            <NavLink className="nav-link disabled" exact to="#" aria-disabled="true" style={{fontSize: '14px'}}>Notifications <span className="badge badge-secondary">0</span></NavLink>
                        </span>
                        <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Coming Up">
                            <NavLink className="nav-link disabled" exact to="#" aria-disabled="true" style={{fontSize: '14px'}}>Sahaaya</NavLink>
                        </span>
                        <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Coming Up">
                            <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link disabled" exact to="#" aria-disabled="true" style={{fontSize: '14px'}}>Reports</NavLink>
                        </span>                        
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/guidelines" style={{fontWeight: '600'}}>Guidelines</NavLink>
                        <NavLink activeClassName="selected" activeStyle={NavStyle} className="nav-link" exact to="/feedback" style={{fontWeight: '600'}}>Feedback</NavLink>
                        <hr className="m-1 mx-3" style={{backgroundColor: '#F5F2F2', opacity:'0.15'}}/>
                        <Link className="nav-link" exact="true" to="#" onClick={props.logout} style={{fontWeight: '600'}}>Logout</Link>
                    </div>
                </li>
            </ul>

        </nav>
    )
}

const NavStyle ={
    color: 'white',
    fontSize: '18px'
}


export default Navbar;





