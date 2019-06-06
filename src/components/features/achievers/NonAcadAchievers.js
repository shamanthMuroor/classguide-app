import React from 'react';
import AddNonAcadAchievers from './AddNonAcadAchievers';
import { db } from '../../../App'

class NonAcadAchievers extends React.Component {
    state = {
        showAcad: false,
        regno: '',
        name: '',
        marks: '',
        motivation: '',
        acadgroups: [],
        error: ''
    }

    componentWillMount = () => {
        db.collection('general').doc('lectureid')
            .collection('nonacademic').get()
                    .then(values => {
                        values.forEach(val => {
                            let arr = []
                            arr.push({
                                id: val.id,
                                ...val.data()
                            })
                            this.setState({acadgroups: this.state.acadgroups.concat(arr), isLoading: false})
                        })
                    })
                    .catch(err => console.log(err))
    }

    // Handling form field changes
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addNonAcadAchievers = () => {
        const { regno, name, marks, motivation } = this.state;
        if( regno === '' || name === '' || marks === '' || motivation === '')
            this.setState({error: 'Enter valid details'})
        else {
            db.collection('general').doc('lectureid')
                .collection('nonacademic').add({
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
                        error: ''
                    })
                })
        }
    }

    delNonAcadAchievers = (id) => {
        db.collection('general').doc('lectureid')
            .collection('nonacademic').doc(id).delete()
                    .then(() => {
                        console.log(id + " del successful")
                        alert("deleted successfully")
                        this.setState({ acadgroups: [...this.state.acadgroups.filter(group => group.id !== id)] })
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
            marks: '',
            motivation: '',
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
        if (this.state.acadgroups.length > 0) {
            html = this.state.acadgroups.map((data, i) => {
                return (
                    <div key={i} className="row mt-3 bg-light align-items-center">
                        <div className="d-flex" style={{ width: '100%' }}>
                            <div className="col">{++i}</div>
                            <div className="col">{data.regno}</div>
                            <div className="col">{data.name}</div>
                            <div className="col">{data.marks}</div>
                            <div className="col">{data.motivation}</div>
                            <button
                                type="button"
                                className="text-danger"
                                onClick={()=>this.delNonAcadAchievers(data.id)} 
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
                    this.state.showAcad 
                    ? 
                    (
                        <AddNonAcadAchievers 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            name={this.state.name}
                            marks={this.state.marks}
                            motivation={this.state.motivation}
                            hideNonAcadAchievers={this.hideNonAcadAchievers}
                            error={this.state.error} 
                            addNonAcadAchievers={this.addNonAcadAchievers}
                        />

                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center">
                                <h2>Non Academic Achievers</h2>
                            </div>
                            <div className="row">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.showNonAcadForm}
                                >
                                    + Add group
                                </button>
                            </div>
                            <div className="row mt-5">
                                <div className="d-flex" style={{ width: '100%' }}>
                                    <div className="col">SL. NO</div>
                                    <div className="col">REG. NO</div>
                                    <div className="col">STUDENT NAME</div>
                                    <div className="col">MARKS</div>
                                    <div className="col">MOTIVATION</div>
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

export default NonAcadAchievers;