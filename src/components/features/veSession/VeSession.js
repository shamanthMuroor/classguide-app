import React from 'react';
import AddVeSession from './AddVeSession';
import Modal from 'react-modal';
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

class VeSession extends React.Component {
    state = {
            modalIsOpen: false,
            date: '',
            agenda: '',
            description: '',
            groups: [],
            error: '',
            showSuccess: false,
            submitting: false,
            loading: true,
            isDeleting: false,
            id: '',
            user: {}
        }

    componentWillMount = () => {
        if(localStorage.staffAuth) {
            let val = JSON.parse(localStorage.getItem("staffAuth"))
            this.setState({user: jwt_decode(val.token)})
            db.collection('general').doc(jwt_decode(val.token).id)
                .collection('vesession').orderBy('date').get()
                .then(val => {
                    if(val.size > 0) {
                        val.forEach(values => {
                            let arr = []
                            arr.push({
                                id: values.id,
                                ...values.data()
                            })
                            this.setState({ groups: this.state.groups.concat(arr), loading: false })
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


    openModal = (id) => {
        this.setState({ id: id, modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    // Handling form field changes
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addVeSession = () => {
        const { date, agenda, description } = this.state;
        if( date === '' || agenda === '' || description === '' )
            this.setState({error: 'Enter valid details'})
        else {
            this.setState({submitting: true})
            db.collection('general').doc(this.state.user.id)
                .collection('vesession').add({
                    date: this.state.date,
                    agenda: this.state.agenda,
                    description: this.state.description
                })
                .then((docRef) => {
                    const { id } = docRef;
                    // console.log("adding id: " + id)
                    const group = { id, date, agenda, description };
                    this.setState({
                        showVeSession: false,        
                        groups: this.state.groups.concat(group),
                        date: '',
                        description: '',
                        agenda: '',
                        error: '',
                        showSuccess: true,
                        submitting: false
                    })
                })
        }
    }

    delVeSession = () => {
        this.setState({ isDeleting: true, showSuccess: false })
        db.collection('general').doc(this.state.user.id)
            .collection('vesession').doc(this.state.id).delete()
            .then(() => {
                // console.log(this.state.id + " del successful")
                this.setState({ groups: [...this.state.groups.filter(group => group.id !== this.state.id)], isDeleting: false, modalIsOpen: false  })
            })
            .catch(err => console.log(err))
    }

    showAddVeSession = () => {
        this.setState({ showVeSession: true })
    }

    hideVeSession = () => {
        this.setState({ 
            showVeSession: false,
            date: '',
            agenda: '',
            description: '',
            error: ''
        })
    }

    render() {
        let loader = 
            <div className="text-center" style={{margin: '100px'}}>
                <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}} />
            </div>
            
        let successMsg=             
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Value Education Session added successfully
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        let html =   
            <div style={{margin: '50px 20px 100px 20px', padding: '20px'}}>
                <h3>No data Found!</h3>
                <small style={{color:'gray'}}>(Note: Please check your internet connection)</small>
            </div>

        if (this.state.groups.length > 0) {
            html = this.state.groups.map((data, i) => {
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
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Date: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.date}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Agenda: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.agenda}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Description: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.description}</span>
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
                    this.state.showVeSession 
                    ? 
                    (
                        <AddVeSession 
                            handleChange={this.handleChange}
                            date={this.state.date}
                            agenda={this.state.agenda}
                            description={this.state.description}
                            hideVeSession={this.hideVeSession}
                            error={this.state.error} 
                            addVeSession={this.addVeSession}
                            submitting={this.state.submitting}
                        />
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}>
                                <h2>Value Education Session</h2>
                            </div>
                            <div style={{margin: '30px 0px'}}>
                                <div className="text-right">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={this.showAddVeSession}
                                    >
                                        + Add group
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
                                            Are you sure, you want to delete this session permanently?
                                        </div>
                                        <hr />
                                        <div className="text-right">
                                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                                            <button
                                                type="button"
                                                className="btn btn-danger ml-2"
                                                onClick={this.delVeSession}
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

export default VeSession;