import React from 'react';
import AddLevelAchievers from './AddLevelAchievers'
import { db } from '../../../../App'

class LevelAchievers extends React.Component {
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
            .collection('level').get()
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

    addLevelAchievers = () => {
        const { regno, name, marks, motivation } = this.state;
        if( regno === '' || name === '' || marks === '' || motivation === '')
            this.setState({error: 'Enter valid details'})
        else {
            db.collection('general').doc('lectureid')
                .collection('level').add({
                        regno: this.state.regno,
                        name: this.state.name,
                        marks: this.state.marks,
                        motivation: this.state.motivation
                })
                .then((docRef) => {
                    const { regno, name, marks, motivation } = this.state;
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

    delLevelAchievers = (id) => {
        db.collection('general').doc('lectureid')
            .collection('level').doc(id).delete()
                    .then(() => {
                        console.log(id + " del successful")
                        alert("deleted successfully")
                        this.setState({ acadgroups: [...this.state.acadgroups.filter(group => group.id !== id)] })
                    })
                    .catch(err => console.log(err))
    }

    showLevelForm = () => {
        this.setState({ showAcad: true })
    }

    hideLevelAchievers = () => {
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
                                onClick={()=>this.delLevelAchievers(data.id)} 
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
                        <AddLevelAchievers 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            name={this.state.name}
                            marks={this.state.marks}
                            motivation={this.state.motivation}
                            hideLevelAchievers={this.hideLevelAchievers}
                            error={this.state.error} 
                            addLevelAchievers={this.addLevelAchievers}
                        />

                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center">
                                <h2>Academic Achievers Different Levels</h2>
                            </div>
                            <div className="row">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.showLevelForm}
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

export default LevelAchievers;