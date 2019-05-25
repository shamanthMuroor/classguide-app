import React from 'react';
import ParentMasterForm from './meetingForm/ParentMasterForm';

class AddParentMeeting extends React.Component {
    state = {
        showForm: false
    }

    _onButtonClick = () => {
        this.setState({ showForm: true })
    }

    hideForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    render() {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center align-items-center flex-column addBox">
                <h3 className="p-2">Parent Meeting Database</h3>
                    <button 
                        className="btnAdd"
                        onClick={this._onButtonClick}
                        style={{background: '#F5F2F2'}}
                    > 
                        <span className="addPlusSymbol">+</span>
                    </button>
                    <h5 style={{padding:'10px'}}>Add Meeting!</h5>
                </div>                                
                {this.state.showForm && <ParentMasterForm addParentMeeting={this.props.addParentMeeting} hideForm={this.hideForm} />  }
            </React.Fragment>
        )
    }
}

export default AddParentMeeting;
