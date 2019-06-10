import React from 'react';
import Modal from 'react-modal'
import { db } from '../../App';

const customStyles = {
    content: {
        top: '300px',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-10%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        padding: '12px',
        maxHeight: '88vh',
        overflowY: 'auto'
    }
};

Modal.setAppElement('#root')

class EditForm extends React.Component {
    state = {
        editModalIsOpen: true,
        lecturer: "lec1",
        sec: "3rd bsc Ecsm",
        id: '',
        date: '',
        agenda: '',
        description: '',
        failed: true,
        isLoading: false
    }

    componentWillMount = () => {
        db.collection('general').doc(this.props.userId)
        .collection("classMeetings").doc(this.props.id).get()
        .then(val => {
                this.setState({
                    id: this.props.id,
                    date: val.data().date,
                    agenda: val.data().agenda,
                    description: val.data().description,
                    failed: false
                })
            })
            .catch(err => console.log(err))
    }

    closeEditModal = () => {
        return (
            this.props.hideEdit(),
            this.setState({ editModalIsOpen: false })
        )
    }


    // Handling form field changes
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    update = (e) => {
        e.preventDefault();
        if (this.state.date === "" || this.state.agenda === "" || this.state.description === "") {
            this.setState({ error: "Enter valid details" })
        }
        else {
            this.setState({ isLoading: true })
            db.collection('general').doc(this.props.userId)
              .collection("classMeetings").doc(this.props.id).set({
                    agenda: this.state.agenda,
                    date: this.state.date,
                    description: this.state.description
                })
                .then(() => {
                    // console.log("Updated successfully")
                    this.props.hideEdit();
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.editModalIsOpen}
                    onRequestClose={this.closeEditModal}
                    style={customStyles}
                    contentLabel="Edit Modal"
                >
                    <div className="d-flex justify-content-between">
                        <h5>Edit Meeting</h5>
                        <button onClick={this.closeEditModal} style={{ background: 'none', border: 'none' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>&times;</span>
                        </button>
                    </div>
                    <hr style={{ margin: '4px' }} />
                    {
                        this.state.error && <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                    }
                    <form>
                        <div className="form-group" >
                            <label className="h6">Date</label>
                            <div>
                                <input
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    type="date"
                                    placeholder="Enter date"
                                    value={this.state.date}
                                    onChange={this.handleChange}
                                    disabled={this.state.failed}
                                />
                            </div>
                        </div>
                        <div className="form-group" >
                            <label className="h6">Agenda</label>
                            <div>
                                <select className="form-control"
                                    id="agenda"
                                    name="agenda"
                                    value={this.state.agenda}
                                    onChange={this.handleChange}
                                    disabled={this.state.failed}
                                >
                                    <option>Select Meeting Agenda</option>
                                    <option>Planning the activities for the academic year / Getting the student profile entries filled or typed</option>
                                    <option>Preparation for first internal test / Attendance/Preparation for UTSAV</option>
                                    <option>Evaluation of first internals / Attendance / Preparation for UTSAV</option>
                                    <option>Class get together / Planning for Educational tours / Industrial visits / Science Centers</option>
                                    <option>Preparation for final exam / Preparation for College Fest </option>
                                    <option>Unplanned meeting 1</option>
                                    <option>Unplanned meeting 2</option>
                                    <option>Unplanned meeting 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group" >
                            <label className="h6">Description</label>
                            <div>
                                <input
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Enter description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    disabled={this.state.failed}
                                />
                            </div>
                        </div>
                        <div className="text-right">
                            <button type="button" className="btn btn-secondary" onClick={this.closeEditModal}>Close</button>
                            <button
                                type="button"
                                className="btn btn-primary ml-2"
                                onClick={this.update}
                                disabled={this.state.isLoading}
                            >
                                {this.state.isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default EditForm;