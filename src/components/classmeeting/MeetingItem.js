import React from 'react';
import '../../styles/style.css'

class MeetingItem extends React.Component {
    render() {
        const { id, date, agenda, description } = this.props.meeting;
        return (
            <div className="mt-4 container headMeetingItems">
                <div className="row pt-2">
                    <div className="col pr-2">
                        <button
                            type="button"
                            className="text-danger"
                            // data-toggle="tooltip" 
                            // data-placement="bottom" 
                            // title="Delete this meeting"
                            // onClick={this.props.delMeeting.bind(this, id)} 
                            data-toggle="modal"
                            data-target="#exampleModal"
                            style={{ background: 'transparent', border: 'none', float: 'right' }}
                        >
                            <span className="mb-0" aria-hidden="true">
                                <i className="far fa-trash-alt"></i>
                            </span>
                        </button>
                    </div>
                </div>

                <div className="text-left">
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
                            <pre>{description}</pre>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-danger" role="alert">
                                    <i className="fas fa-exclamation-circle"></i><span> Warning: This action cannot be undone!</span>
                                </div>
                                Are you sure, you want to delete this meeting permanently?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.props.delMeeting.bind(this, id)}
                                    data-dismiss="modal"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MeetingItem;