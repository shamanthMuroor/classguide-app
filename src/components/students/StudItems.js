import React from 'react';
import {Link} from 'react-router-dom';

class StudItems extends React.Component {
    constructor(props){
        super(props);
        this.state = { name:this.props.stud.name };
    }

    render() {
        return (
            <React.Fragment>
                <div className="row bg-light indiStudentLists my-3 shadow-lg">     
                    <Link to={{ pathname: `/students/student-profile/${this.state.name}`, state: { StudID: this.props.stud.id } }} >
                        <button className="studItemBtn d-flex" >
                            <div className="col">
                                <span>{this.props.stud.reg}</span>
                            </div>
                            <div className="col">
                                <span>{this.props.stud.name}</span>
                            </div>
                            <div className="col">
                                <span>{this.props.stud.id}</span>
                            </div>
                        </button>
                    </Link>
                </div>
            </React.Fragment>
        ) 
    }
}

export default StudItems;
