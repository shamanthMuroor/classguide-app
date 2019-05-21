// AddMeeting --> MasterForm --> Step1 + Step2 + Step3
import React from 'react';
import MasterForm from './meetingForm/MasterForm';

class AddMeeting extends React.Component{
    state = {
        showForm: false
    }

    _onButtonClick = () => {
        this.setState({ showForm: true })
    }

    hideForm = (a) => {
        this.setState({ showForm: a })
        console.log(this.state.showForm)
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center align-items-center flex-column addBox">
                    <button 
                        className="btnAdd"
                        onClick={this._onButtonClick}
                        style={{background: '#F5F2F2'}}
                    > 
                        <i className="addPlusSymbol fas fa-plus"></i>
                    </button>
                    <h4>Add Meeting!</h4>
                </div>                                
                { this.state.showForm ? <MasterForm addMeeting={this.props.addMeeting} hideForm={this.hideForm} />  : null  }
            </div>
        )
    }
}

export default AddMeeting;