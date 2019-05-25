import React from 'react';

class StudItems extends React.Component {
    func = () => {
        this.props.view(this.props.stud.id)
    }
    render() {
        return (
            <React.Fragment>
                <div className="row bg-light indiStudentLists mt-3 shadow-lg">
                    <button className="studItemBtn d-flex" onClick={this.func}>
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
                </div>
            </React.Fragment>
        ) 
    }
}

export default StudItems;
