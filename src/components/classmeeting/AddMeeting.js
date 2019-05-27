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

    hideForm = () => {
        this.setState({ showForm: !this.state.showForm })
        // console.log(this.state.showForm)
    }

    render() {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center align-items-center flex-column addBox">
                <h3 className="p-2">Class Meeting Database</h3>
                    <button 
                        className="btnAdd"
                        onClick={this._onButtonClick}
                        style={{background: '#F5F2F2'}}
                    > 
                        <span className="addPlusSymbol">+</span>
                    </button>
                    <h5 style={{padding:'10px'}}>Add Meeting!</h5>
                </div>                                
                {this.state.showForm && <MasterForm addMeeting={this.props.addMeeting} hideForm={this.hideForm} />  }
            </React.Fragment>
        )
    }
}

export default AddMeeting;