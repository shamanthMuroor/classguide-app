// AddMeeting --> MasterForm --> Step1 + Step2 + Step3
import React from 'react';
import MasterForm from './meetingForm/MasterForm';

class AddMeeting extends React.Component{
    state = {
        showForm: false,
        showSuccess: false
    }

    onButtonClick = () => {
        this.setState({ showForm: true })
    }

    hideForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    showSuccess = () => {
        this.setState({ showSuccess: true })
    }

    hideSuccess = () => {
        this.setState({ showSuccess: false })
    }

    render() {
        let html =
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Class Meeting added successfully
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center align-items-center flex-column addBox">
                    {this.state.showSuccess && html}
                    <h3 className="p-2">Class Meeting Database</h3>
                    <button
                        className="btnAdd"
                        onClick={this.onButtonClick}
                        style={{ background: '#F5F2F2' }}
                    >
                        <span className="addPlusSymbol">+</span>
                    </button>
                    <h5 style={{ padding: '10px' }}>Add Meeting!</h5>
                </div>
                {this.state.showForm && <MasterForm addMeeting={this.props.addMeeting} hideForm={this.hideForm} showSuccess={this.showSuccess} />}
            </React.Fragment>
        )
    }
}

export default AddMeeting;