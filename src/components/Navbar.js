import React from 'react';
import {Link} from 'react-router-dom';   

function Navbar(props) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark mainNav">

            <button className="navbar-toggler border-0 " type="button" data-toggle="collapse" data-target="#menuToggler" aria-controls="menuToggler" aria-expanded="false" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
            </button>
                
            <button className="navbar-toggler border-0 " type="button" data-toggle="collapse" data-target="#optionToggler" aria-controls="optionToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="">...</span>
            </button>

            {/* Action for Menu toggler */}
            <div className="collapse navbar-collapse topnav" id="menuToggler">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
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

            {/* <Link className="nav-link hidden-sm" exact="true" to="/" >SAC</Link> */}

                
            {/* Action for Option toggler */}
            
            <div className="collapse navbar-collapse flex-row-reverse" id="optionToggler">
                <ul className="navbar-nav mt-2 mt-lg-0 topnav">
                    <li className="nav-item">
                        <Link className="nav-link disabled" to="#" aria-disabled="true">Announcements</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/guidelines" >Guidelines</Link>
                    </li>
                    <button className="btn text-white text-left" onClick={props.logout}>Logout</button>
                </ul>
            </div>            
        </nav>
    )
}

export default Navbar;





