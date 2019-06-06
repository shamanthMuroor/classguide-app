import React from 'react';
import AddCounselling from './AddCounselling';
import { db } from '../../../App'

class Counselling extends React.Component {
    state = {
        showPeers: false,
        regno: '',
        name: '',
        marks: '',
        reason: '',
        measures: '',
        output: '',
        groups: [],
        error: ''
    }

    componentWillMount = () => {
        db.collection('general').doc('lectureid')
            .collection('counselling').orderBy('regno').get()
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

    addCounselling = () => {
        const { regno, output, name, marks, reason, measures } = this.state;
        if( regno === '' ||  output === '' || name === '' || marks === '' || measures === '')
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

    delPeerGroup = (id) => {
        // console.log("delete id: " + id)
        db.collection('general').doc('lectureid')
        .collection('counselling').doc(id).delete()
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
                            <div className="col">{data.name}</div>
                            <div className="col">{data.marks}</div>
                            <div className="col">{data.reason}</div>
                            <div className="col">{data.measures}</div>
                            <div className="col">{data.output}</div>
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
                            <div className="row mt-5">
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <div className="col">SL. NO</div>
                                    <div className="col">REG. NO</div>
                                    <div className="col">STUDENT LEARNER</div>
                                    <div className="col">MARKS</div>
                                    <div className="col">REASON</div>
                                    <div className="col">MEASURES TAKEN</div>
                                    <div className="col">OUTPUT</div>
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

export default Counselling;