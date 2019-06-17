import React from 'react';
import Modal from 'react-modal'
import { db } from '../../App';

const customStyles = {
    content: {
        top: '350px',
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
        id: '',
        reg: '',
        date: '',
        agenda: '',
        attended: '',
        description: '',
        isLoading: false
    }

    componentWillMount = () => {
        db.collection('general').doc(this.props.userId)
          .collection("parentMeetings").doc(this.props.id).get()
            .then(val => {
                this.setState({
                    id: this.props.id,
                    reg: val.data().reg,
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
        if (this.state.reg === "" || this.state.date === "" || this.state.agenda === "" || this.state.attended === "" || this.state.description === "") {
            this.setState({ error: "Enter valid details" })
        }
        else {
            this.setState({ isLoading: true })
            db.collection('general').doc(this.props.userId)
              .collection("parentMeetings").doc(this.props.id).set({
                    reg: this.state.reg,
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
                    <small style={{color: 'gray'}}>All fields are compulsory!</small>
                    <form>
                        <div className="form-group">
                            <div>
                                <label className="h6">Register Number</label>
                                <input
                                    className="form-control"
                                    id="reg"
                                    name="reg"
                                    type="number"
                                    placeholder="Register Number"
                                    value={this.state.reg}
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
                            <label className="h6">Relationship with student</label>
                            <div>
                                <select
                                    className="form-control"
                                    id="attended"
                                    name="attended"
                                    value={this.state.attended}
                                    onChange={this.handleChange}
                                >
                                    <option>Select relationship</option>
                                    <option>Parent</option>
                                    <option>Brother/Sister</option>
                                    <option>Guardian</option>
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
                                />
                            </div>
                        </div>
                        {
                            this.state.error && <div className="alert alert-danger" role="alert">
                                {this.state.error}
                            </div>
                        }
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
