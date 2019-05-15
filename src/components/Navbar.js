import React from 'react';
import {Link} from 'react-router-dom';        

  
function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#333333'}}>

            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation" >
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#" aria-controls="" aria-expanded="false" aria-label="Toggle navigation">
                <span className="">...</span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" href="#">Student details <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="#">Meetings</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Sahaaya</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;





