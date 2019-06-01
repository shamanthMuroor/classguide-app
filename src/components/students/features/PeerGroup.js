import React from 'react';
import AddPeerGroup from './AddPeerGroup';
import { db } from '../../../App'

class PeerGroup extends React.Component {
    state = {
        showPeers: false,
        regno: '',
        student_learner: '',
        marks: '',
        student_guide: '',
        measures: '',
        groups: []
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


    componentWillUnmount = () => {        
        this.setState({
            showPeers: false,
            regno: '',
            student_learner: '',
            marks: '',
            student_guide: '',
            measures: '',
            groups: []
        })
    }

    // Handling form field changes
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addPeerGroup = () => {
        db.collection('general').doc('lectureid')
            .collection('peergroup').add({
                regno: this.state.regno,
                student_learner: this.state.student_learner,
                marks: this.state.marks,
                student_guide: this.state.student_guide,
                measures: this.state.measures
            })
            .then(() => {
                const { regno, student_guide, student_learner, marks, measures } = this.state;
                const group = { regno, student_guide, student_learner, marks, measures };
                this.setState({
                    showPeers: false,        
                    groups: this.state.groups.concat(group)
                })
            })
    }

    showAddPeerGroup = () => {
        this.setState({ showPeers: true })
    }

    render() {
        let html =
            <div className="row">
                <div className="d-flex" style={{ width: '100%' }}>
                    <div className="col-md-1">-</div>
                    <div className="col-md-2">-</div>
                    <div className="col-md-3">-</div>
                    <div className="col-md-1">-</div>
                    <div className="col-md-3">-</div>
                    <div className="col-md-2">-</div>
                </div>
            </div>
        if (this.state.groups.length > 0) {
            html = this.state.groups.map((data, i) => {
                return (
                    <div key={i} className="row mt-3 bg-light align-items-center">
                        <div className="d-flex" style={{ width: '100%' }}>
                            <div className="col-xs-1 col-md-1">{++i}</div>
                            <div className="col-xs-2 col-md-2">{data.regno}</div>
                            <div className="col-xs-3 col-md-3">{data.student_learner}</div>
                            <div className="col-xs-1 col-md-1">{data.marks}</div>
                            <div className="col-xs-3 col-md-3">{data.student_guide}</div>
                            <div className="col-xs-2 col-md-2">{data.measures}</div>
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
                            student_guide={this.state.student_guide}
                            measures={this.state.measures}
                            // error={this.state.error} 
                            addPeerGroup={this.addPeerGroup}
                        />
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="row mt-5">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.showAddPeerGroup}
                                >
                                    + Add group
                                </button>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <div className="col-xs-1 col-md-1">SL. NO</div>
                                    <div className="col-xs-2 col-md-2">REG. NO</div>
                                    <div className="col-xs-3 col-md-3">STUDENT LEARNER</div>
                                    <div className="col-xs-1 col-md-1">MARKS</div>
                                    <div className="col-xs-3 col-md-3">STUDENT GUIDE</div>
                                    <div className="col-xs-2 col-md-2">MEASURES TAKEN</div>
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