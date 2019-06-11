import React from 'react';
import {Link} from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                    <div className="text-center foot">
                        <div style={{margin: '20px', padding: '10px', color: '#F5F2F2'}}>
                            <h5>St. Aloysius College(Autonomous) Mangaluru</h5>
                            <small style={{color: '#f5f2f2c7'}}>(Re-accredited by NAAC with 'A' Grade)</small>
                        </div>
                        <ul className="font-weight-bold footerUL d-print-none" >
                            <li className="active">
                                <Link exact="true" to="/"><i className="fas fa-home"></i> Home </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/students">Student Details </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/class-meetings">Class Meetings </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/parent-meetings">Parent Meetings </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/counselling">Counselling </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/slow-learners">Slow Learners </Link>
                            </li>
                        </ul>
                        <ul className="font-weight-bold footerUL d-print-none" >
                            <li>
                                <Link exact="true" to="/academic-achievers">Academic Achievers </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/non-academic-achievers">Achievers(Level) </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/achievers-levels">Non-Academic Achievers </Link>
                            </li>
                        </ul>
                        <ul className="font-weight-bold footerUL d-print-none" >
                            <li>
                                <Link exact="true" to="/reports">Reports </Link>
                                <span>|</span>
                            </li>
                            <li>
                                <Link exact="true" to="/rural">Rural Students </Link>
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