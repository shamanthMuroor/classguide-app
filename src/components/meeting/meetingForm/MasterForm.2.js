// MasterForm --> Date + Agenda + Minutes
import React from 'react';
import {db} from '../../../App';
import Date from './Date';
import Agenda from './Agenda';
// import Minutes from './Minutes';
// import '../../../styles/style.css';

class MasterForm extends React.Component {
    state = {
        // lecturer: "lec1",
        // sec: "3rd bsc Ecsm",
        step: 1,
        date: '',
        agenda: '',
        minutes: ''
    }

    //Proceed to Next step
    nextStep = () => {
        const { step } =  this.state;
        this.setState({
            step: step + 1
        })
    }

    //Go back to prev step
    prevStep = () => {
        const { step } =  this.state;
        this.setState({
            step: step - 1
        })
    }
    
    //Handle the changes
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }


    // // functions for button
    // previousButton() {
    //     let currentStep = this.state.currentStep;
    //     if (currentStep !== 1) {
    //         return (
    //             <button
    //                 className="btn btn-secondary mr-2"
    //                 type="button" 
    //                 onClick={this._prev}
    //             >
    //                 Previous
    //             </button>
    //         )
    //     }
    //     return null;
    // }

    // nextButton() {
    //     let currentStep = this.state.currentStep;
    //     if (currentStep < 3) {
    //         return (
    //             <button
    //                 className="btn btn-primary"
    //                 type="button" 
    //                 onClick={this._next}
    //             >
    //                 Next
    //             </button>
    //         )
    //     }
    //     return null;
    // }


    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     db.collection("classMeetings").doc(this.state.lecturer)
    //         .collection(this.state.sec).add({
    //             agenda: this.state.agenda,
    //             date: this.state.date,
    //             minutes: this.state.minutes
    //     })
    //     .then((docRef) => {
    //         alert("Meeting added successfully")
    //         console.log("Added id: " + docRef.id)
    //         this.props.addMeeting(docRef.id, this.state.agenda, this.state.date, this.state.minutes)
    //         this.props.hideForm(false);
    //         this.setState({
    //             currentStep: 1,
                // date: '',
                // agenda: '',
                // minutes: ''
    //         })
    //     })
    //     .catch(err => console.log(err))
    // }

    render() {
        const { step } = this.state;
        const { date, agenda, minutes } = this.state;
        const values = { date, agenda, minutes }
        
        switch (step) {
            case 1:
                return (
                    <Date
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return (                    
                    <Agenda
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )

            case 3:
                return (
                    <h1>minu</h1>
                )
            case 4:
                return (
                    <h1>confirm</h1>
                )   
            case 5:
                return (
                    <h1>success</h1>
                )             
        } 
    }
}

  
export default MasterForm;
