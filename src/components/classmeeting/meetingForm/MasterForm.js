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
        description: '',
        isLoading: false
    }

    // Code to increment currentStep and validate form fields
    _next = () => {
        this.setState({error: false})
        if(this.state.currentStep === 1) {
            if(this.state.date === "") {
                this.setState({error: "Enter valid date"})
            }
            else {
                let currentStep = this.state.currentStep
                currentStep = currentStep >= 2 ? 3 : currentStep + 1
                this.setState({ currentStep: currentStep })
            }                 
        }
        else if(this.state.currentStep === 2) {
            if(this.state.agenda === "" || this.state.agenda === "Select Meeting Agenda") {
                this.setState({ error: "Enter valid agenda" })
            }
            else {
                let currentStep = this.state.currentStep
                currentStep = currentStep >= 2 ? 3 : currentStep + 1
                this.setState({ currentStep: currentStep })
            }
        }
    }

    // Code to decrement currentStep
    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    // functions for button
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <button
                    className="btn btn-secondary mr-2"
                    type="button" 
                    onClick={this._prev}
                    style={{float:'left'}}
                >
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
                    className="btn btn-primary"
                    type="button" 
                    onClick={this._next}
                    style={{float:'right'}}
                >
                    Next
                </button>
            )
        }
        return null;
    }

    // Handling form field changes
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Form submit section
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.description === "") {
            this.setState({ error: "Enter valid Description" })
        }
        else {
            this.setState({ isLoading: true })
            db.collection("classMeetings").doc(this.state.lecturer)
                .collection(this.state.sec).add({
                    agenda: this.state.agenda,
                    date: this.state.date,
                    description: this.state.description
                })
                .then((docRef) => {
                    // console.log("Added id: " + docRef.id)
                    this.props.addMeeting(docRef.id, this.state.agenda, this.state.date, this.state.description)
                    this.setState({
                        currentStep: 1,
                        date: '',
                        agenda: '',
                        description: '',
                        isLoading: false
                    })
                    this.props.showSuccess()
                    this.props.hideForm();
                })
                .catch(err => {
                    console.log(err)
                    this.props.history.push('/error');
                })
        }
    }

    // Close Form on Close button
    changeForm = () => {
        this.setState({
            currentStep: 1,
            date: '',
            agenda: '',
            description: ''
        })     
        this.props.hideForm();   
    }

    render() {
        return (
            <div className="d-flex align-items-center flex-column overlay shadow-lg" >
                <h3>Add Class Meeting</h3>
                <p>Step {this.state.currentStep} </p>

                <div className="boxForm">
                    <form onSubmit={this.handleSubmit}>
                        <div className="d-flex flex-row-reverse">
                        <button 
                            type="button"
                            className="close" 
                            aria-label="Close"
                            data-toggle="tooltip" 
                            data-placement="bottom" 
                            title="Close"
                            onClick={this.changeForm}
                        >
                            <p aria-hidden="true"><small className="align-middle" style={{fontSize: '14px'}}>Close</small>&times;</p>
                        </button>
                        </div>
                        <Step1
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            date={this.state.date} 
                            error={this.state.error} 
                        />
                        <Step2
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            agenda={this.state.agenda}
                            error={this.state.error} 
                        />
                        <Step3
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            description={this.state.description}
                            error={this.state.error} 
                            isLoading={this.state.isLoading}
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
