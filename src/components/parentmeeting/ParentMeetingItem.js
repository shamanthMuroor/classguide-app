import React from 'react';
import Modal from 'react-modal';
import EditForm from './EditForm';
import '../../styles/style.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

class ParentMeetingItem extends React.Component {
    constructor() {
        super();

        this.state = {
            delModalIsOpen: false,
            showEdit: false
        };

        this.openDelModal = this.openDelModal.bind(this);
        this.closeDelModal = this.closeDelModal.bind(this);
    }


    openDelModal() {
        this.setState({ delModalIsOpen: true });
    }

    closeDelModal() {
        this.setState({ delModalIsOpen: false });
    }

    handleEdit = () => {
        this.setState({ showEdit: true });
    }

    hideEdit = () => {
        this.setState({ showEdit: false });
    }

    render() {
        let { id, reg, date, agenda, attended, description } = this.props.parentmeeting;
        date = date.split("-").reverse().join("-");
        return (
            <React.Fragment>
                <div key={id} className="mt-4 container headMeetingItems">
                    <div className="row pt-2">
                        <div className="col pr-2">
                            <button
                                type="button"
                                className="text-danger"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Delete this meeting"
                                // onClick={this.props.delMeeting.bind(this, id)} 
                                onClick={this.openDelModal}
                                style={{ background: 'transparent', border: 'none', float: 'right' }}
                            >
                                <span className="mb-0" aria-hidden="true">
                                    <i className="far fa-trash-alt"></i>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="text-secondary mr-2"
                                onClick={this.handleEdit}
                                style={{ background: 'transparent', border: 'none', float: 'right' }}
                            >
                                <span className="mb-0" aria-hidden="true">
                                    <i className="far fa-edit"></i>
                                </span>
                            </button>

                        </div>
                    </div>

                    <div className="text-left p-3">
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Register No: </span>
                            </div>
                            <div className="col-md-10">
                                <span>{reg}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Date: </span>
                            </div>
                            <div className="col-md-10">
                                <span>{date}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Parent/Guardian Name: </span>
                            </div>
                            <div className="col-md-10">
                                <span>{attended}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Agenda: </span>
                            </div>
                            <div className="col-md-10">
                                <span>{agenda}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Description: </span>
                            </div>
                            <div className="col-md-10">
                                <pre style={{
                                    marginBottom: '0px',
                                    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
                                }}
                                >
                                    {description}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Modal
                        isOpen={this.state.delModalIsOpen}
                        onRequestClose={this.closeDelModal}
                        style={customStyles}
                        contentLabel="Delete Modal"
                    >
                        <div className="d-flex justify-content-between">
                            <h5>Confirm Delete</h5>
                            <button onClick={this.closeDelModal} style={{ background: 'none', border: 'none' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>&times;</span>
                            </button>
                        </div>
                        <hr />
                        <div>
                            <div className="alert alert-danger" role="alert">
                                <i className="fas fa-exclamation-circle"></i><span> Warning: This action cannot be undone!</span>
                            </div>
                            Are you sure, you want to delete this meeting permanently?
                        </div>
                        <hr />
                        <div className="text-right">
                            <button type="button" className="btn btn-secondary" onClick={this.closeDelModal}>Close</button>
                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={() => {
                                    const cb = () => {
                                        this.closeDelModal();
                                    }
                                    this.props.delMeeting(id, cb);

                                }}
                                disabled={this.props.isDeleting}
                            >
                                {this.props.isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </Modal>
                </div>
                <div>
                    {this.state.showEdit && <EditForm id={id} hideEdit={this.hideEdit} />}
                </div>
            </React.Fragment>
        )
    }
}
export default ParentMeetingItem;