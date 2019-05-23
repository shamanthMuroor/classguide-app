// AddMeeting --> MasterForm --> Step1 + Step2 + Step3
import React from 'react';
import MasterForm from './meetingForm/MasterForm';

class AddMeeting extends React.Component{
    state = {
        showForm: false
    }

    // _onButtonClick = () => {
    //     this.setState({ showForm: true })
    // }

    // hideForm = (a) => {
    //     this.setState({ showForm: a })
    //     console.log(this.state.showForm)
    // }

    render() {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center align-items-center flex-column addBox">
                    <button 
                        className="btnAdd"
                        data-toggle="modal" 
                        data-target="#exampleModal"
                        style={{background: '#F5F2F2'}}
                    > 
                        <span className="addPlusSymbol">+</span>
                    </button>
                    <h5 style={{padding:'10px'}}>Add Meeting!</h5>
                </div>                

{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button> */}


                <MasterForm addMeeting={this.props.addMeeting} />
            </React.Fragment>
        )
    }
}

export default AddMeeting;