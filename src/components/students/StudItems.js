import React from 'react';
import {Link} from 'react-router-dom';

class StudItems extends React.Component {
    constructor(props){
        super(props);
        this.state = { name:this.props.stud.name};
    }

    render() {
        return (
            <React.Fragment>
                <Link to={{ pathname: `/students/student-profile/${this.state.name}`, state: { studDetails: this.props.stud } }} >
                    <div className="row bg-light indiStudentLists my-3 shadow-lg">
                        <button className="studItemBtn d-flex" >
                            <div className="col">
                                <span>{this.props.slno}</span>
                            </div>
                            <div className="col">
                                <span>{this.props.stud.regno}</span>
                            </div>
                            <div className="col">
                                <span>{this.props.stud.name}</span>
                            </div>
                        </button>
                    </div>
                </Link>
            </React.Fragment>
        ) 
    }
}

export default StudItems;
