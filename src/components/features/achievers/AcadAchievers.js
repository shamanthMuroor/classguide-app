import React from 'react';
import AddAcadAchievers from './AddAcadAchievers';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';
import { db } from '../../../App'

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

class AcadAchievers extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            showAcad: false,
            regno: '',
            name: '',
            marks: '',
            motivation: '',
            acadgroups: [],
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
                .collection('academic').get()
                        .then(values => {
                            if(values.size > 0) {
                                values.forEach(val => {
                                    let arr = []
                                    arr.push({
                                        id: val.id,
                                        ...val.data()
                                    })
                                    this.setState({acadgroups: this.state.acadgroups.concat(arr), loading: false})
                                })
                            }
                            else {
                                this.setState({loading: false})
                            }
                        })
                        .catch(err => console.log(err))
        }
    }
   
    openModal(id) {
        this.setState({ id: id, modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    // Handling form field changes
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addAcadAchievers = () => {
        const { regno, name, marks, motivation } = this.state;
        if( regno === '' || name === '' || marks === '' )
            this.setState({error: 'Enter valid details'})
        else {
            this.setState({submitting: true})
            db.collection('general').doc(this.state.user.id)
                .collection('academic').add({
                        regno: this.state.regno,
                        name: this.state.name,
                        marks: this.state.marks,
                        motivation: this.state.motivation
                })
                .then((docRef) => {
                    const { id } = docRef;
                    const group = { id, regno, name, marks, motivation };
                    this.setState({
                        showAcad: false,        
                        acadgroups: this.state.acadgroups.concat(group),
                        regno: '',
                        name: '',
                        marks: '',
                        motivation: '',
                        error: '',
                        showSuccess: true,
                        submitting: false
                    })
                })
        }
    }

    delAcadAchievers = () => {
        this.setState({ isDeleting: true, showSuccess: false })
        db.collection('general').doc(this.state.user.id)
            .collection('academic').doc(this.state.id).delete()
                    .then(() => {
                        // console.log(this.state.id + " del successful")
                        this.setState({ acadgroups: [...this.state.acadgroups.filter(group => group.id !== this.state.id)] , isDeleting: false, modalIsOpen: false })
                    })
                    .catch(err => console.log(err))
    }

    showAcadForm = () => {
        this.setState({ showAcad: true })
    }

    hideAcadAchievers = () => {
        this.setState({ 
            showAcad: false,
            regno: '',
            name: '',
            marks: '',
            motivation: '',
            error: ''
        })
    }

    render() {
        let loader = 
            <div className="text-center my-5">
                <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}} />
            </div>

        let successMsg=             
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Academic Achiever Details added successfully
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        let html =       
            <div style={{margin: '50px 20px 100px 20px', padding: '20px'}}>
                <h3>No data Found!</h3>
                <small style={{color:'gray'}}>(Note: Please check your internet connection)</small>
            </div>
                        
        if (this.state.acadgroups.length > 0) {
            html = this.state.acadgroups.map((data, i) => {
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
                    </div>
                    <div className="card-body d-flex">
                        <div className="row mx-0" style={{ width: '100%' }}>
                            <div className="col-md-2">
                                <div>
                                    <i className="fas fa-user-circle fa-5x d-none d-md-block"></i>
                                    <span style={{ fontWeight: 'bold', color: 'gray' }}>Student Name</span>
                                    <div>{data.name}</div> 
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
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Motivation: </span>
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
                    this.state.showAcad 
                    ? 
                    (
                        <AddAcadAchievers 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            name={this.state.name}
                            marks={this.state.marks}
                            motivation={this.state.motivation}
                            hideAcadAchievers={this.hideAcadAchievers}
                            error={this.state.error} 
                            addAcadAchievers={this.addAcadAchievers}
                            submitting={this.state.submitting}
                        />

                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}>
                                <h3>Academic Achievers</h3>
                            </div>
                            <hr />
                            <div style={{margin: '30px 0px'}}>
                                <div className="text-right">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={this.showAcadForm}
                                    >
                                        + Add Academic Achievers
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
                                            Are you sure, you want to delete this permanently?
                                        </div>
                                        <hr />
                                        <div className="text-right">
                                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                                            <button
                                                type="button"
                                                className="btn btn-danger ml-2"
                                                onClick={this.delAcadAchievers}
                                                disabled={this.state.isDeleting}
                                            >
                                                {this.state.isDeleting ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    </Modal>
                                </div>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

export default AcadAchievers;