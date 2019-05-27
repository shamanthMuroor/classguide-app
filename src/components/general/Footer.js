import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/aloylogo.png';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                    <div className="text-center foot">
                        <img src={logo} width="100px" height="100px" alt="College Logo"/>
                        <h5>St. Aloysius College(Autonomous) Mangaluru</h5>
                        <ul className="font-weight-bold footerUL" >
                            <li className="active">
                                <Link exact="true" to="/"><i className="fas fa-home"></i> Home </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/students">Student Details </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/classmeetings">Class Meetings </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/parentmeetings">Parent Meetings </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/guidelines">Guidelines</Link>
                            </li>
                        </ul>
                        <small className="copyrights">© Copyright 2019</small>
                    </div>
            </footer>
        )
    }
}

export default Footer;