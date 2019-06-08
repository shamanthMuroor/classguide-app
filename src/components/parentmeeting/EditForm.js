import React from 'react';
import Modal from 'react-modal'
import { db } from '../../App';

const customStyles = {
    content: {
        top: '340px',
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
        showEdit: false,
        lecturer: "lec1",
        sec: "3rd bsc Ecsm",
        id: '',
        regno: '',
        date: '',
        agenda: '',
        attended: '',
        description: '',
        isLoading: false
    }

    componentWillMount = () => {
        console.log(this.props.id)
        db.collection('parentMeetings').doc(this.state.lecturer)
            .collection(this.state.sec).doc(this.props.id).get()
            .then(val => {
                this.setState({
                    id: this.props.id,
                    regno: val.data().reg,
                    date: val.data().date,
                    agenda: val.data().agenda,
                    attended: val.data().attended,
                    description: val.data().description
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
        if (this.state.regno === "" || this.state.date === "" || this.state.agenda === "" || this.state.attended === "" || this.state.description === "") {
            this.setState({ error: "Enter valid details" })
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
                    console.log("Updated successfully")
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
                        <div className="form-group">
                            <div>
                                <label className="h6">Register Number</label>
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
                                />
                            </div>
                        </div>
                        <div className="form-group" >
                            <label className="h6">Agenda</label>
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
                            <label className="h6">Parent/Guardian Attended</label>
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
