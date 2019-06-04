import React from 'react';
import AddSlowLearners from './AddSlowLearners';
import { db } from '../../../../App'

class SlowLearners extends React.Component {
    state = {
        showPeers: false,
        regno: '',
        student_name: '',
        marks: '',
        comment: '',    
        measures: '',
        groups: [],
        error: ''
    }

    componentWillMount = () => {
        db.collection('general').doc('lectureid')
            .collection('slowlearner').orderBy('regno').get()
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

    addLearners = () => {
        const { regno, student_name, marks, measures } = this.state;
        if( regno === '' || student_name === '' || marks === '' || measures === '')
            this.setState({error: 'Enter valid details'})
        else {
            db.collection('general').doc('lectureid')
                .collection('peergroup').add({
                    regno: this.state.regno,
                    student_name: this.state.student_name,
                    marks: this.state.marks,
                    comment: this.state.comment,
                    measures: this.state.measures
                })
                .then((docRef) => {
                    const { regno, student_name, marks, comment, measures } = this.state;
                    const { id } = docRef;
                    const group = { id, regno, student_name, marks, comment, measures };
                    this.setState({
                        showPeers: false,        
                        groups: this.state.groups.concat(group),
                        regno: '',
                        student_name: '',
                        marks: '',
                        comment: '',
                        measures: '',
                        error: ''
                    })
                })
        }
    }

    delPeerGroup = (id) => {
        db.collection('general').doc('lectureid')
        .collection('slowlearner').doc(id).delete()
          .then(() => {
            console.log(id + " del successful")
            alert("deleted successfully")
            this.setState({ groups: [...this.state.groups.filter(group => group.id !== id)] })
          })
          .catch(err => console.log(err))
    }

    showLearnersForm = () => {
        this.setState({ showPeers: true })
    }

    hideLearnersForm = () => {
        this.setState({ 
            showPeers: false,
            regno: '',
            student_name: '',
            marks: '',
            comment: '',
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
                </div>
            </div>
        if (this.state.groups.length > 0) {
            html = this.state.groups.map((data, i) => {
                return (
                    <div key={i} className="row mt-3 bg-light align-items-center">
                        <div className="d-flex" style={{ width: '100%' }}>
                            <div className="col">{++i}</div>
                            <div className="col">{data.regno}</div>
                            <div className="col">{data.student_name}</div>
                            <div className="col">{data.marks}</div>
                            <div className="col">{data.comment}</div>
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
                        <AddSlowLearners 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            student_name={this.state.student_name}
                            marks={this.state.marks}
                            comment={this.state.comment}
                            measures={this.state.measures}
                            hideLearnersForm={this.hideLearnersForm}
                            error={this.state.error} 
                            addLearners={this.addLearners}
                        />
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}><h2>Slow Learners</h2></div>
                            <div className="row">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.showLearnersForm}
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

export default SlowLearners;