// MasterForm --> Step1 + Step2 + Step3
import React from 'react';
import {db} from '../../../App';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import '../../../styles/style.css';

class MasterForm extends React.Component {
    state = {
        lecturer: "lec1",
        sec: "3rd bsc Ecsm",
        currentStep: 1,
        date: '',
        agenda: '',
        minutes: '',
    }

    componentWillUnmount = () => {
        this.setState({
            currentStep: 1,
            date: '',
            agenda: '',
            minutes: ''
        })
    }

    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2 ? 3 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    // functions for our button
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Previous
        </button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 3) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={this._next}>
                    Next
        </button>
            )
        }
        return null;
    }

    handleChange = event => {
        // console.log(event.target.value)
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        db.collection("classMeetings").doc(this.state.lecturer)
            .collection(this.state.sec).add({
                agenda: this.state.agenda,
                date: this.state.date,
                minutes: this.state.minutes
        })
        .then((docRef) => {
            alert("Meeting added successfully")
            console.log("Added id: " + docRef.id)
            this.props.addMeeting(docRef.id, this.state.agenda, this.state.date, this.state.minutes)
            this.props.hideForm(false);
            this.setState({
                currentStep: 1,
                date: '',
                agenda: '',
                minutes: ''
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="d-flex align-items-center flex-column outerBox overlay">
                <h1>React Form</h1>
                <p>Step {this.state.currentStep} </p>

                <div className="boxForm">
                    <form onSubmit={this.handleSubmit}>
                        <Step1
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            date={this.state.date}
                        />
                        <Step2
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            agenda={this.state.agenda}
                        />
                        <Step3
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            minutes={this.state.minutes}
                        />
                        {this.previousButton()}
                        {this.nextButton()}

                    </form>
                </div>
            </div>
        );
    }
}

  
export default MasterForm;
