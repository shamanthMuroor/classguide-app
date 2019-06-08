import React from 'react';
import AddCounselling from './AddCounselling';
import Modal from 'react-modal';
import EditForm from './EditForm';
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

class Counselling extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            showEdit: false,
            showRuralForm: false,
            regno: '',
            name: '',
            marks: '',
            reason: '',
            measures: '',
            output: '',
            groups: [],
            error: '',
            showSuccess: false,
            submitting: false,
            loading: true,
            isDeleting: false,
            id: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount = () => {
        db.collection('general').doc('lectureid')
            .collection('counselling').orderBy('regno').get()
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

    addCounselling = () => {
        const { regno, output, name, marks, reason, measures } = this.state;
        if( regno === '' ||  name === '' || marks === '' || reason === '' )
            this.setState({error: 'Enter valid details'})
        else {
            db.collection('general').doc('lectureid')
                .collection('counselling').add({
                    regno: this.state.regno,
                    name: this.state.name,
                    marks: this.state.marks,
                    reason: this.state.reason,
                    measures: this.state.measures,
                    output: this.state.output
                })
                .then((docRef) => {
                    const { id } = docRef;
                    console.log("adding id: " + id)
                    const group = { id, regno, output, name, marks, reason, measures };
                    this.setState({
                        showPeers: false,        
                        groups: this.state.groups.concat(group),
                        regno: '',
                        name: '',
                        marks: '',
                        reason: '',
                        output: '',
                        measures: '',
                        error: ''
                    })
                })
        }
    }

    delCounselling = () => {
        this.setState({ isDeleting: true, showSuccess: false })
        db.collection('general').doc('lectureid')
        .collection('counselling').doc(this.state.id).delete()
          .then(() => {
            console.log(this.state.id + " del successful")
            this.setState({ groups: [...this.state.groups.filter(group => group.id !== this.state.id)], isDeleting: false, modalIsOpen: false  })
          })
          .catch(err => console.log(err))
    }

    showAddPeerGroup = () => {
        this.setState({ showPeers: true })
    }

    hideCounselling = () => {
        this.setState({ 
            showPeers: false,
            regno: '',
            name: '',
            marks: '',
            reason: '',
            output: '',
            measures: '',
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
            <strong>Success!</strong> Rural Student details added successfully
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        let html =
            <div className="row">
                <div className="d-flex" style={{ width: '100%' }}>
                </div>
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
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Reason: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.reason}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Measures: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.measures}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Output: </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span>{data.output}</span>
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
                    this.state.showPeers 
                    ? 
                    (
                        <AddCounselling 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            name={this.state.name}
                            marks={this.state.marks}
                            reason={this.state.reason}
                            measures={this.state.measures}
                            output={this.state.output}
                            hideCounselling={this.hideCounselling}
                            error={this.state.error} 
                            addCounselling={this.addCounselling}
                        />
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}>
                                <h2>Counselling</h2>
                                <h5>List of Students with special attention</h5>
                            </div>
                            <div className="row">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.showAddPeerGroup}
                                >
                                    + Add group
                                </button>
                            </div>
                            <hr />
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
                                                onClick={this.delCounselling}
                                                disabled={this.state.isDeleting}
                                            >
                                                {this.state.isDeleting ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    </Modal>
                                </div>
                                <div>
                                    {this.state.showEdit && <EditForm id={this.state.id} hideEdit={this.hideEdit} />}
                                </div>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

export default Counselling;