import React from 'react';
import {Link} from 'react-router-dom';  
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
            <div className="collapse navbar-collapse topnav" id="menuToggler"  style={{flexGrow:0}}>
                <Link className="navbar-brand d-none d-lg-flex" to="/">
                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="College Logo" />
                SAC
                </Link>
                <ul className="navbar-nav nav-pills mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link onClick={hidenav} className="nav-link" exact="true" to="/"><i className="fas fa-home"></i> Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={hidenav} className="nav-link" exact="true" to="/students">Student Details </Link>
                    </li>
                    <li className="nav-item">
                            <Link onClick={hidenav} className="nav-link" exact="true" to="/classmeetings">Class Meetings</Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={hidenav} className="nav-link" exact="true" to="/parentmeetings">Parent Meetings</Link>
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
                        <Link className="nav-link disabled" to="#" aria-disabled="true">Notifications <span className="badge badge-secondary">0</span></Link>
                        <Link className="nav-link disabled" to="#" aria-disabled="true">Sahaaya</Link>
                        <Link className="nav-link" to="/guidelines" >Guidelines</Link>
                        <hr className="m-1 mx-3" style={{backgroundColor: '#F5F2F2', opacity:'0.15'}}/>
                        <Link className="nav-link" to="#" onClick={props.logout} >Logout</Link>
                    </div>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar;





