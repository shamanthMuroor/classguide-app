import React from 'react';
import {Link} from 'react-router-dom';   

  
class Navbar extends React.Component{
    render () {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{backgroundColor: '#333333'}}>

                <button className="navbar-toggler border-0 " type="button" data-toggle="collapse" data-target="#menuToggler" aria-controls="menuToggler" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#optionToggler" aria-controls="optionToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="">...</span>
                </button>

                {/* Action for Menu toggler */}
                <div className="collapse navbar-collapse" id="menuToggler">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link className="nav-link" exact="true" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" exact="true" to="/guidestudents">Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" exact="true" to="/meetings">Meetings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="#" aria-disabled="true">Sahaaya</Link>
                        </li>
                    </ul>
                </div>
                
                {/* Action for Option toggler */}
                <div className="collapse navbar-collapse" id="optionToggler">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="#" aria-disabled="true">Announcements</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="#" aria-disabled="true">Guidelines</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Logout</Link>
                        </li>
                    </ul>
                </div>            
            </nav>
        )
    }
}

export default Navbar;





