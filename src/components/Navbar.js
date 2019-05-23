import React from 'react';
import {Link} from 'react-router-dom';   

function Navbar(props) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark mainNav">

            <button className="navbar-toggler border-0 " type="button" data-toggle="collapse" data-target="#menuToggler" aria-controls="menuToggler" aria-expanded="false" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Action for Menu toggler */}
            <div className="collapse navbar-collapse topnav" id="menuToggler">
                <ul className="navbar-nav nav-pills mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" exact="true" to="/"><i className="fas fa-home"></i> Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" exact="true" to="/guidestudents">Student Details </Link>
                    </li>
                    <li className="nav-item">
                            <Link className="nav-link" exact="true" to="/meetings">Class Meetings</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" to="#" aria-disabled="true">Sahaaya</Link>
                    </li>
                </ul>
            </div>

            <ul className="mb-0 colgLogo">
                <li className="nav-item" >
                    <Link className="nav-link" exact="true" to="/" style={{padding:'5px'}}>SAC</Link>
                </li>
            </ul>

            <ul className="mb-0 dp">
                <li className="nav-item dropdown">
                    <Link className="nav-link" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user-circle fa-2x"></i>
                    </Link>
                    <div className="dropdown-menu dropDownLinks" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="nav-link disabled" to="#" aria-disabled="true">Announcements</Link>
                        <Link className="nav-link" to="/guidelines" >Guidelines</Link>
                        <button className="btn text-left" onClick={props.logout} style={{color: 'rgba(255,255,255,.5)'}}>Logout</button>
                    </div>
                </li>
            </ul>


        </nav>
    )
}

export default Navbar;





