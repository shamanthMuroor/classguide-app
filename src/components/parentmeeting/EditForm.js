import React from 'react';
import {db} from '../../App';

class EditForm extends React.Component {
    state = {
        lecturer: "lec1",
        sec: "3rd bsc Ecsm",
        regno: '',
        date: '',
        agenda: '',
        attended: '',
        description: ''  
    }

    componentWillMount = () => {
        db.collection('parentMeetings').doc(this.state.lecturer)
          .collection(this.state.sec).doc(this.props.id).get()
            .then(val => {
                this.setState({
                    regno: val.data().reg,
                    date: val.data().date,
                    agenda: val.data().agenda,
                    attended: val.data().attended,
                    description: val.data().description
                })
            })
            .catch(err => console.log(err))
    }

    // Handling form field changes
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }    

    update = (e) => {
        e.preventDefault();
        if (this.state.description === "") {
            this.setState({ error: "Enter valid Description" })
        }
        else {
            this.setState({ isLoading: true })
            db.collection("parentMeetings").doc(this.state.lecturer)
                .collection(this.state.sec).doc(this.props.id).set({
                    reg: this.state.regno,
                    attended: this.state.attended,
                    agenda: this.state.agenda,
                    date: this.state.date,
                    description: this.state.description
            })
            .then(() => {
                this.props.replaceParentMeeting(this.props.id, this.state.regno, this.state.agenda, this.state.date, this.state.description)
                // this.props.showSuccess()
                this.props.hideEdit();
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div>
                <form style={{ marginTop: '50px' }}>
                    <h3 className="text-center">Edit Meeting!</h3>
                    {/* {
                        this.state.error && <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                    } */}
                    <div className="d-flex flex-row-reverse">
                        <button 
                            type="button"
                            className="close" 
                            aria-label="Close"
                            data-toggle="tooltip" 
                            data-placement="bottom" 
                            title="Close"
                            onClick={this.props.hideEdit}
                        >
                            <p aria-hidden="true"><small className="align-middle" style={{fontSize: '14px'}}>Close</small>&times;</p>
                        </button>
                    </div>                    
                    <div className="form-group mt-3" >
                        <div>
                        <label className="h5">Register Number</label>
                            <input
                                className="form-control"
                                id="regno"
                                name="regno"
                                type="number"
                                placeholder="Register Number"
                                value={this.state.regno}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h5">Date</label>
                        <div>
                            <input
                                className="form-control"
                                id="date"
                                name="date"
                                type="date"
                                placeholder="Enter date"
                                value={this.state.date}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h5">Agenda</label>
                        <div>
                            <input
                                className="form-control"
                                id="agenda"
                                name="agenda"
                                type="text"
                                placeholder="Agenda"
                                value={this.state.agenda}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h5">Parent/Guardian Attended</label>
                        <div>
                            <input
                                className="form-control"
                                id="attended"
                                name="attended"
                                type="text"
                                placeholder="Enter Parent/Guardian attended"
                                value={this.state.attended}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h5">Description</label>
                        <div>
                            <input
                                className="form-control"
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Enter description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.update} 
                    >
                        Submit
                    </button>
                </form>
            </div>     
        )
    }
}

export default EditForm;
