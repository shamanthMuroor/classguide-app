import React from 'react';
import AddRural from './AddRural';
import Modal from 'react-modal';
import EditForm from './EditForm';
import { db } from '../../../App'
import jwt_decode from 'jwt-decode'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

class Rural extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            showEdit: false,
            showRuralForm: false,
            regno: '',
            student_name: '',
            marks: '',
            comment: '',
            motivation: '',
            students: [],
            error: '',
            showSuccess: false,
            submitting: false,
            loading: true,
            isDeleting: false,
            id: '',
            user: {}
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount = () => {
        if(localStorage.staffAuth) {
            let val = JSON.parse(localStorage.getItem("staffAuth"))
            this.setState({user: jwt_decode(val.token)})
            db.collection('general').doc(jwt_decode(val.token).id)
                .collection('rural').orderBy('regno').get()
                .then(val => {
                    if(val.size > 0) {
                        val.forEach(values => {
                            let arr = []
                            arr.push({
                                id: values.id,
                                ...values.data()
                            })
                            this.setState({ students: this.state.students.concat(arr), loading: false })
                        })
                    }
                    else {
                        this.setState({loading: false})
                    }
                })
                .catch(err => console.log(err))
        } else {
            this.props.history.push('/error')
        }
    }

    
    openModal(id) {
        this.setState({ id: id, modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleEdit(id) {
        this.setState({ id: id, showEdit: true });
    }

    hideEdit = () => {
        this.setState({ showEdit: false });
    }

    // Handling form field changes
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // Adding Rural Students
    addRuralStudent = () => {
        const { regno, student_name, marks, comment, motivation } = this.state;
        if( regno === '' || student_name === '' || marks === '' )
            this.setState({error: 'Enter valid details'})
        else {
            this.setState({submitting: true})
            db.collection('general').doc(this.state.user.id)
                .collection('rural').add({
                    regno: this.state.regno,
                    student_name: this.state.student_name,
                    marks: this.state.marks,
                    comment: this.state.comment,
                    motivation: this.state.motivation
                })
                .then((docRef) => {
                    const { id } = docRef;
                    // console.log("added id: " + id)
                    const student = { id, regno, student_name, marks, comment, motivation };
                    this.setState({
                        showRuralForm: false,        
                        students: this.state.students.concat(student),
                        regno: '',
                        student_name: '',
                        marks: '',
                        comment: '',
                        motivation: '',
                        error: '',
                        showSuccess: true,
                        submitting: false
                    })
                })
                .catch(err => console.log(err))
        }
    }

    // Deleting Rural Student data
    delRuralStudents = () => {
        this.setState({ isDeleting: true, showSuccess: false })
        db.collection('general').doc(this.state.user.id)
        .collection('rural').doc(this.state.id).delete()
          .then(() => {
            console.log(this.state.id + " del successful")
            this.setState({ students: [...this.state.students.filter(student => student.id !== this.state.id)],isDeleting: false, modalIsOpen: false })
          })
          .catch(err => console.log(err))
    }


    // Showing Adding Rural Students Form
    showRuralForm = () => {
        this.setState({ showRuralForm: true })
    }

    // Closes the add form
    hideForm = () => {
        this.setState({ 
            showRuralForm: false,
            regno: '',
            student_name: '',
            marks: '',
            comment: '',
            student_guide: '',
            motivation: '',
            error: ''
        })
    }

    // Hides success message
    hideSuccess = () => {
        this.setState({ showSuccess: false })
    }

    render() {
        let loader = 
            <div className="text-center" style={{margin: '100px'}}>
                <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}} />
            </div>

        let successMsg=             
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Rural Student details added successfully
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        let html =       
            <div style={{margin: '50px 20px 100px 20px', padding: '20px'}}>
                <h3>No data Found</h3>
                <small style={{color:'gray'}}>(Note: Please check your internet connection)</small>
            </div>

        if (this.state.students.length > 0) {
            html = this.state.students.map((data, i) => {
                return (
                    <div key={i} className="card mt-3 bg-light">
                        <div className="card-header">
                            <small style={{ color: 'gray' }}>{++i}</small>
                            <button
                                    type="button"
                                    className="text-danger"
                                    onClick={()=>this.openModal(data.id)} 
                                    style={{ background: 'transparent', border: 'none', float: 'right'}}
                                >
                                    <span className="mb-0" aria-hidden="true">
                                        <i className="far fa-trash-alt"></i>
                                    </span>
                            </button>
                            <button
                                type="button"
                                className="text-secondary mr-2"
                                onClick={()=>this.handleEdit(data.id)}
                                style={{ background: 'transparent', border: 'none', float: 'right' }}
                            >
                                <span className="mb-0" aria-hidden="true">
                                    <i className="far fa-edit"></i>
                                </span>
                            </button>
                        </div>
                        <div className="card-body d-flex">
                            <div className="row mx-0" style={{ width: '100%' }}>
                                <div className="col-md-2">
                                    <div>
                                        <i className="fas fa-user-circle fa-5x d-none d-md-block"></i>
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Student Learner</span>
                                        <div>{data.student_name}</div> 
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <hr className="d-md-none" />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>Register No: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.regno}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>Marks: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.marks}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>Comment: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.comment}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>motivation: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.motivation}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="container">
                {
                    this.state.showRuralForm 
                    ? 
                    (
                        <AddRural 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            student_name={this.state.student_name}
                            marks={this.state.marks}
                            comment={this.state.comment}
                            motivation={this.state.motivation}
                            hideForm={this.hideForm}
                            error={this.state.error} 
                            addRuralStudent={this.addRuralStudent}
                            submitting={this.state.submitting}
                        />
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}>
                                <h2>Rural Student List</h2>
                            </div>
                            <hr />
                            <div style={{margin: '30px 0px'}}>
                                <div className="text-right">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={this.showRuralForm}
                                    >
                                        + Add Rural Students
                                    </button>
                                </div>   
                            </div>
                            {this.state.showSuccess && successMsg}
                            {this.state.loading ? loader : html}

                                <div>
                                    <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        contentLabel="Delete Modal"
                                    >
                                        <div className="d-flex justify-content-between">
                                            <h5>Confirm Delete</h5>
                                            <button onClick={this.closeModal} style={{ background: 'none', border: 'none' }}>
                                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>&times;</span>
                                            </button>
                                        </div>
                                        <hr />
                                        <div>
                                            <div className="alert alert-danger" role="alert">
                                                <i className="fas fa-exclamation-circle"></i><span> Warning: This action cannot be undone!</span>
                                            </div>
                                            Are you sure, you want to delete this meeting permanently?
                                        </div>
                                        <hr />
                                        <div className="text-right">
                                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                                            <button
                                                type="button"
                                                className="btn btn-danger ml-2"
                                                onClick={this.delRuralStudents}
                                                disabled={this.state.isDeleting}
                                            >
                                                {this.state.isDeleting ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    </Modal>
                                </div>
                                <div>
                                    {this.state.showEdit && <EditForm id={this.state.id} hideEdit={this.hideEdit} userId={this.state.user.id} />}
                                </div>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

export default Rural;