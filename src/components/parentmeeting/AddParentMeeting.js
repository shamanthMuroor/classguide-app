import React from 'react';
import ParentMasterForm from './meetingForm/ParentMasterForm';

class AddParentMeeting extends React.Component {
    state = {
        showForm: false,        
        showSuccess: false
    }

    // Opens Form
    onButtonClick = () => {
        this.setState({ showForm: true })
    }

    // Hides Form
    hideForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    // Shows success message after submitting
    showSuccess = () => {
        this.setState({ showSuccess: true })
    }

    // Hides success message
    hideSuccess = () => {
        this.setState({ showSuccess: false })
    }

    render() {
        let html =
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Parent Meeting added successfully
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center align-items-center flex-column addBox">
                {this.state.showSuccess && html}
                <h3 className="p-2">Parent Meeting Database</h3>
                    <button 
                        className="btnAdd"
                        onClick={this.onButtonClick}
                        style={{background: '#F5F2F2'}}
                    > 
                        <span className="addPlusSymbol">+</span>
                    </button>
                    <h5 style={{padding:'10px'}}>Add Meeting!</h5>
                </div>                                
                {this.state.showForm && <ParentMasterForm addParentMeeting={this.props.addParentMeeting} hideForm={this.hideForm} showSuccess={this.showSuccess} />  }
            </React.Fragment>
        )
    }
}

export default AddParentMeeting;
