// AddMeeting --> MasterForm --> Step1 + Step2 + Step3
import React from 'react';
import PropTypes from 'prop-types';
import MasterForm from './meetingForm/MasterForm';

class AddMeeting extends React.Component{
    state = {
        showComponent: false
    }

    _onButtonClick = () => {
        this.setState({ showComponent: true })
    }

    hideForm = (a) => {
        this.setState({ showComponent: a })
        console.log(this.state.showComponent)
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
                        <i className="addSymbolbtn fas fa-plus"></i>
                    </button>
                    <h4>Add Meeting!</h4>
                </div>                                
                { this.state.showComponent ? <MasterForm addMeeting={this.props.addMeeting} hideForm={this.hideForm} />  : null  }
            </div>
        )
    }
}

//PropTypes
AddMeeting.propTypes = {
    addMeeting: PropTypes.func.isRequired
}

export default AddMeeting;