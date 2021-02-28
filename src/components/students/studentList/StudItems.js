// StudItems --> StudProfile
import React from 'react';
import { Link } from 'react-router-dom'

class StudItems extends React.Component {
    render() {
        let listItem = 
            <Link to={`students/${this.props.stud.id}`}> 
                <div className="row bg-light indiStudentLists my-3 shadow-lg">
                    <button className="studItemBtn d-flex overflow-auto" >
                        <div className="col">
                            <span>{this.props.slno}</span>
                        </div>
                        <div className="col">
                            <span>{this.props.stud.regno}</span>
                        </div>
                        <div className="col-md-4">
                            <span>{this.props.stud.name}</span>
                        </div>
                        <div className="col d-print-none">
                            <span>{this.props.stud.dob}</span>
                        </div>
                        <div className="col d-print-none">
                            <span>{this.props.stud.gender}</span>
                        </div>
                        <div className="col d-none d-print-block">
                            <span>
                                <input 
                                type='checkbox'
                                style={{
                                    height: '25px',
                                    width: '25px'
                                }}
                                />
                            </span>
                        </div>
                    </button>
                </div>
            </Link>
    
        return (
            <React.Fragment>
                { listItem }
            </React.Fragment>
        ) 
    }
}

export default StudItems;
