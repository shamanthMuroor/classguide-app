import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/aloylogo.png';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div >
                    <div className="text-center foot">
                        <img src={logo} width="100px" height="100px" style={{paddingTop:'10px'}} alt="College Logo"/>
                        <h5>St. Aloysius College(Autonomous) Mangaluru</h5>
                        <ul className="font-weight-bold footerUL" >
                            <li className="active">
                                <Link exact="true" to="/"><i className="fas fa-home"></i> Home </Link>
                            </li>
                            <li>
                                <Link exact="true" to="/guidestudents">Student Details </Link>
                            </li>
                            <li>
                                <Link exact="true" to="/meetings">Class Meetings</Link>
                            </li>
                            <li>
                                <Link className=" disabled" to="#" aria-disabled="true">Sahaaya</Link>
                            </li>
                        </ul>
                        <small className="copyrights">© Copyright 2019</small>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;