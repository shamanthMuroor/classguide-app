import React from 'react';
import AddLearnerGroups from './AddLearnerGroups';
import { db } from '../../../App'

class SlowLearners extends React.Component {
    state = {
        showPeers: false,
        peersbtn: false,
        regno: '',
        student_learner: '',
        marks: '',
        comment: '',
        student_guide: '',
        measures: '',
        groups: [],
        error: '',
        showSuccess: false,
        submitting: false,
        loading: true
    }

    componentWillMount = () => {
        db.collection('general').doc('lectureid')
            .collection('slowLearner').orderBy('regno').get()
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

    // Handling form field changes
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // Adding Slow Learners and Peer Group
    addLearnerGroups = () => {
        const { regno, student_guide, student_learner, marks, comment, measures } = this.state;
        if( regno === '' || student_learner === '' || marks === '' || measures === '')
            this.setState({error: 'Enter valid details'})
        else {
            this.setState({submitting: true})
            db.collection('general').doc('lectureid')
                .collection('slowLearner').add({
                    regno: this.state.regno,
                    student_learner: this.state.student_learner,
                    marks: this.state.marks,
                    comment: this.state.comment,
                    student_guide: this.state.student_guide,
                    measures: this.state.measures
                })
                .then((docRef) => {
                    const { id } = docRef;
                    console.log("adding id: " + id)
                    const group = { id, regno, student_guide, student_learner, marks, comment, measures };
                    this.setState({
                        showPeers: false,        
                        groups: this.state.groups.concat(group),
                        regno: '',
                        student_learner: '',
                        marks: '',
                        comment: '',
                        student_guide: '',
                        measures: '',
                        error: '',
                        showSuccess: true,
                        submitting: false
                    })
                })
                .catch(err => console.log(err))
        }
    }

    // Deleting Group
    delPeerGroup = (id) => {
        // console.log("delete id: " + id)
        db.collection('general').doc('lectureid')
        .collection('slowLearner').doc(id).delete()
          .then(() => {
            console.log(id + " del successful")
            alert("deleted successfully")
            this.setState({ groups: [...this.state.groups.filter(group => group.id !== id)] })
          })
          .catch(err => console.log(err))
    }


    // Toggle for Adding (Slow learner and peer group) Form
    showLearnerForm = () => {
        this.setState({ 
            showPeers: true,
            showAddPeerGroup: false
        })
    }

    // Closes the add form
    hideForm = () => {
        this.setState({ 
            showPeers: false,
            regno: '',
            student_learner: '',
            marks: '',
            comment: '',
            student_guide: '',
            measures: '',
            error: ''
        })
    }

    // Hides success message
    hideSuccess = () => {
        this.setState({ showSuccess: false })
    }

    // Toggle for Show Peer button
    togglePeerGroup = () => {
        this.setState({peersbtn: !this.state.peersbtn})
    }

    render() {
        let loader = 
            <div className="text-center my-5">
                <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}} />
            </div>


        let successMsg=             
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Slow learner details added successfully
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        let html =       
            <div className="my-5">
                <h3>No data Found</h3>
                <small style={{color:'gray'}}>(Note: Maybe also due to network problem)</small>
            </div>

        if (this.state.groups.length > 0) {
            html = this.state.groups.map((data, i) => {
                return (
                    <div key={i} className="card mt-3 bg-light">
                        <div className="card-header d-flex justify-content-between">
                            <small style={{ color: 'gray' }}>{++i}</small>
                            <button
                                    type="button"
                                    className="text-danger"
                                    onClick={()=>this.delPeerGroup(data.id)} 
                                    style={{ background: 'transparent', border: 'none'}}
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
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Student Learner</span>
                                        <div>{data.student_learner}</div> 
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
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>Measures: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.measures}</span>
                                        </div>
                                    </div>
                                    {this.state.peersbtn && <hr className="d-md-none" />} 
                                </div>
                                { this.state.peersbtn &&
                                    <div className="col-md-2">
                                        <i className="fas fa-user-circle fa-5x d-none d-md-block text-center"></i>      
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Student Guide</span>
                                        <div>{data.student_guide}</div>  
                                    </div>
                                }
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
                        <AddLearnerGroups 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            student_learner={this.state.student_learner}
                            marks={this.state.marks}
                            comment={this.state.comment}
                            student_guide={this.state.student_guide}
                            measures={this.state.measures}
                            hideForm={this.hideForm}
                            error={this.state.error} 
                            addLearnerGroups={this.addLearnerGroups}
                            submitting={this.state.submitting}
                        />
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}>
                                { 
                                    this.state.peersbtn 
                                    ? 
                                    (
                                        <React.Fragment>
                                            <h2>Peer Group Learning</h2>
                                            <h5>List of slow learner and student guides </h5>
                                        </React.Fragment> 
                                    )  
                                    : 
                                    (
                                        <React.Fragment>
                                            <h2>Slow Learners</h2>
                                            <h5>List of slow learner</h5>
                                        </React.Fragment> 
                                    ) 
                                }
                            </div>
                            <hr />
                            <div className="m-2">
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={this.showLearnerForm}
                                    >
                                        + Add Slow Learners
                                    </button>
                                    <button
                                        className="btn btn-secondary ml-2"
                                        onClick={this.togglePeerGroup}
                                    >
                                        { 
                                            this.state.peersbtn 
                                            ? 
                                            (
                                                <h6>Hide Peer Groups  <i className="fas fa-toggle-on"></i>
                                                </h6> 
                                            )
                                            : 
                                            (
                                                <h6>Show Peer Groups <i className="fas fa-toggle-off"></i>
                                                </h6>
                                            )
                                        }
                                    </button>
                                </div>   
                            </div>
                            <hr />
                            {this.state.showSuccess && successMsg}
                            {this.state.loading ? loader : html}
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

export default SlowLearners;