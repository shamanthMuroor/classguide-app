import React from 'react';
import AddPeerGroup from './AddPeerGroup';
import { db } from '../../../../App'

class PeerGroup extends React.Component {
    state = {
        showPeers: false,
        regno: '',
        student_learner: '',
        marks: '',
        comment: '',
        student_guide: '',
        measures: '',
        groups: [],
        error: ''
    }

    componentWillMount = () => {
        db.collection('general').doc('lectureid')
            .collection('peergroup').orderBy('regno').get()
            .then(val => {
                val.forEach(values => {
                    let arr = []
                    arr.push({
                        id: values.id,
                        ...values.data()
                    })
                    this.setState({ groups: this.state.groups.concat(arr) })
                })
            })
            .catch(err => console.log(err))
    }

    // Handling form field changes
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addPeerGroup = () => {
        const { regno, student_guide, student_learner, marks, measures } = this.state;
        if( regno === '' ||  student_guide === '' || student_learner === '' || marks === '' || measures === '')
            this.setState({error: 'Enter valid details'})
        else {
            db.collection('general').doc('lectureid')
                .collection('peergroup').add({
                    regno: this.state.regno,
                    student_learner: this.state.student_learner,
                    marks: this.state.marks,
                    comment: this.state.comment,
                    student_guide: this.state.student_guide,
                    measures: this.state.measures
                })
                .then((docRef) => {
                    const { regno, student_guide, student_learner, marks, comment, measures } = this.state;
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
                        error: ''
                    })
                })
        }
    }

    delPeerGroup = (id) => {
        // console.log("delete id: " + id)
        db.collection('general').doc('lectureid')
        .collection('peergroup').doc(id).delete()
          .then(() => {
            console.log(id + " del successful")
            alert("deleted successfully")
            this.setState({ groups: [...this.state.groups.filter(group => group.id !== id)] })
          })
          .catch(err => console.log(err))
    }

    showAddPeerGroup = () => {
        this.setState({ showPeers: true })
    }

    hideAddPeerGroup = () => {
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

    render() {
        let html =
            <div className="row">
                <div className="d-flex" style={{ width: '100%' }}>
                    <div className="col">-</div>
                    <div className="col">-</div>
                    <div className="col">-</div>
                    <div className="col">-</div>
                    <div className="col">-</div>
                    <div className="col">-</div>
                    <div className="col">-</div>
                </div>
            </div>
        if (this.state.groups.length > 0) {
            html = this.state.groups.map((data, i) => {
                return (
                    <div key={i} className="row mt-3 bg-light align-items-center">
                        <div className="d-flex" style={{ width: '100%' }}>
                            <div className="col">{++i}</div>
                            <div className="col">{data.regno}</div>
                            <div className="col">{data.student_learner}</div>
                            <div className="col">{data.marks}</div>
                            <div className="col">{data.comment}</div>
                            <div className="col">{data.student_guide}</div>
                            <div className="col">{data.measures}</div>
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
                        <AddPeerGroup 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            student_learner={this.state.student_learner}
                            marks={this.state.marks}
                            comment={this.state.comment}
                            student_guide={this.state.student_guide}
                            measures={this.state.measures}
                            hideAddPeerGroup={this.hideAddPeerGroup}
                            error={this.state.error} 
                            addPeerGroup={this.addPeerGroup}
                        />
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}>
                                <h2>Peer Group Learning</h2>
                                <h5>List of slow learner and student guides </h5>
                            </div>
                            <div className="row">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.showAddPeerGroup}
                                >
                                    + Add group
                                </button>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <div className="col">SL. NO</div>
                                    <div className="col">REG. NO</div>
                                    <div className="col">STUDENT LEARNER</div>
                                    <div className="col">MARKS</div>
                                    <div className="col">COMMENT</div>
                                    <div className="col">STUDENT GUIDE</div>
                                    <div className="col">MEASURES TAKEN</div>
                                </div>
                            </div>
                            {html}
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

export default PeerGroup;