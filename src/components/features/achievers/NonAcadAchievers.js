import React from 'react';
import AddNonAcadAchievers from './AddNonAcadAchievers';
import Modal from 'react-modal';
import { db } from '../../../App'
// import jwt_decode from 'jwt-decode';

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

class NonAcadAchievers extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            showAcad: false,
            regno: '',
            name: '',
            excellence: '',
            prizes: '',
            acadgroups: [],
            error: '',
            showSuccess: false,
            submitting: false,
            loading: true,
            isDeleting: false,
            id: '',
            user: {id: "5cef889e91c2fe210298755c"} // {id: ""} has been added extra
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount = () => {
        // if(localStorage.staffAuth) {
        //     let val = JSON.parse(localStorage.getItem("staffAuth"))
        //     this.setState({user: jwt_decode(val.token)})
        //     db.collection('general').doc(jwt_decode(val.token).id)
            db.collection('general').doc(this.state.user.id)
                .collection('nonacademic').get()
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
        // } else {
        //     this.props.history.push('/error')
        // }
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

    addNonAcadAchievers = () => {
        const { regno, name, excellence, prizes } = this.state;
        if( regno === '' || name === '' || excellence === '' || prizes === '')
            this.setState({error: 'Enter valid details'})
        else {
            this.setState({submitting: true})
            db.collection('general').doc(this.state.user.id)
                .collection('nonacademic').add({
                        regno: this.state.regno,
                        name: this.state.name,
                        excellence: this.state.excellence,
                        prizes: this.state.prizes
                })
                .then((docRef) => {
                    const { id } = docRef;
                    const group = { id, regno, name, excellence, prizes };
                    this.setState({
                        showAcad: false,        
                        acadgroups: this.state.acadgroups.concat(group),
                        regno: '',
                        name: '',
                        excellence: '',
                        prizes: '',
                        error: '',
                        showSuccess: true,
                        submitting: false
                    })
                })
        }
    }

    delNonAcadAchievers = () => {
        this.setState({ isDeleting: true, showSuccess: false })
        db.collection('general').doc(this.state.user.id)
            .collection('nonacademic').doc(this.state.id).delete()
                    .then(() => {
                        // console.log(this.state.id + " del successful")
                        this.setState({ acadgroups: [...this.state.acadgroups.filter(group => group.id !== this.state.id)], isDeleting: false, modalIsOpen: false  })
                    })
                    .catch(err => console.log(err))
    }

    showNonAcadForm = () => {
        this.setState({ showAcad: true })
    }

    hideNonAcadAchievers = () => {
        this.setState({ 
            showAcad: false,
            regno: '',
            name: '',
            excellence: '',
            prizes: '',
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
                <strong>Success!</strong> Non-Academic Achiever Details added successfully
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
                    <div className="card-header p-2">
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
                    <div className="card-body p-2 d-flex">
                        <div className="row mx-0" style={{ width: '100%' }}>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Student Name: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.name}</span>
                                    </div>
                                </div>
                                <hr className="m-1" />
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Register No: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.regno}</span>
                                    </div>
                                </div>
                                <hr className="m-1" />                                
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Area of Excellence/ Participation: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.excellence}</span>
                                    </div>
                                </div>
                                <hr className="m-1" />                                
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Participation/ Prizes won: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.prizes}</span>
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
                        <AddNonAcadAchievers 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            name={this.state.name}
                            excellence={this.state.excellence}
                            prizes={this.state.prizes}
                            hideNonAcadAchievers={this.hideNonAcadAchievers}
                            error={this.state.error} 
                            addNonAcadAchievers={this.addNonAcadAchievers}
                            submitting={this.state.submitting}
                        />

                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}>
                                <h3>Non-Academic Achievers</h3>
                            </div>
                            <hr />
                            <div style={{margin: '30px 0px'}}>
                                <div className="text-right">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={this.showNonAcadForm}
                                    >
                                        + Add Non-Academic Achievers
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
                                                onClick={this.delNonAcadAchievers}
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

export default NonAcadAchievers;