import React from 'react';
import Modal from 'react-modal'
import { db } from '../../../App';

const customStyles = {
    content: {
        top: '320px',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-10%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        padding: '12px',
        maxHeight: '480px',
        overflowY: 'auto'
    }
};

Modal.setAppElement('#root')

class EditForm extends React.Component {
    state = {
        editModalIsOpen: true,
        id: '',
        regno: '',
        student_learner: '',
        marks: '',
        comment: '',
        student_guide: '',
        measures: '',
        failed: true,
        isLoading: false
    }

    componentWillMount = () => {
        db.collection('general').doc(this.props.userId)
            .collection('slowLearner').doc(this.props.id).get()
            .then(val => {
                this.setState({
                    id: this.props.id,
                    regno: val.data().regno,
                    student_learner: val.data().student_learner,
                    marks: val.data().marks,
                    comment: val.data().comment,
                    student_guide: val.data().student_guide,
                    measures: val.data().measures,
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
        if(this.state.regno === '' || this.state.student_learner === '' || this.state.marks === '') {
            this.setState({ error: "Enter valid details" })
        }
        else {
            this.setState({ isLoading: true })
            db.collection('general').doc(this.props.userId)
                .collection('slowLearner').doc(this.props.id).set({
                    regno: this.state.regno,
                    student_learner: this.state.student_learner,
                    marks: this.state.marks,
                    comment: this.state.comment,
                    student_guide: this.state.student_guide,
                    measures: this.state.measures
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
                        <h5>Edit Slow learner and Peer Group</h5>
                        <button onClick={this.closeEditModal} style={{ background: 'none', border: 'none' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>&times;</span>
                        </button>
                    </div>
                    <hr style={{ margin: '4px' }} />
                    <form>
                        <div className="form-group" >
                        <label className="h6">* Register Number</label>
                        <div>
                            <input
                                className="form-control"
                                id="regno"
                                name="regno"
                                type="number"
                                placeholder="Register Number"
                                value={this.state.regno}
                                onChange={this.handleChange}
                                disabled={this.state.failed}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h6">* Student Learner's Name</label>
                        <div>
                            <input
                                className="form-control"
                                id="student_learner"
                                name="student_learner"
                                type="text"
                                placeholder="Student Learner's Name"
                                value={this.state.student_learner}
                                onChange={this.handleChange}
                                disabled={this.state.failed}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h6">* Marks</label>
                        <div>
                            <input
                                className="form-control"
                                id="Marks"
                                name="marks"
                                type="number"
                                placeholder="Enter Marks(%)"
                                value={this.state.marks}
                                onChange={this.handleChange}
                                disabled={this.state.failed}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h6">Comment<small style={{color: 'gray'}}> (ex: Subject)</small></label>
                        <div>
                            <input
                                className="form-control"
                                id="comment"
                                name="comment"
                                type="text"
                                placeholder="Enter Comment"
                                value={this.state.comment}
                                onChange={this.handleChange}
                                disabled={this.state.failed}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h6">Student Guide Name</label>
                        <div>
                            <input
                                className="form-control"
                                id="student_guide"
                                name="student_guide"
                                type="text"
                                placeholder="Student Guide's Name"
                                value={this.state.student_guide}
                                onChange={this.handleChange}
                                disabled={this.state.failed}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="h6">Measures Taken</label>
                        <div>
                            <textarea
                                className="form-control"
                                id="measures"
                                name="measures"
                                rows="3"
                                cols="30"
                                type="text"
                                placeholder="Measures taken"
                                value={this.state.measures}
                                onChange={this.handleChange}
                                disabled={this.state.failed}
                            >
                            </textarea> 
                        </div>
                    </div>
                    
                    {
                        this.state.error && <div className="alert alert-danger my-2" role="alert">
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