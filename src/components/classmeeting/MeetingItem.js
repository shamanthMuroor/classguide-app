import React from 'react';
import '../../styles/style.css'

class MeetingItem extends React.Component {
    render() {
        let { id, date, agenda, description } = this.props.meeting;  
        date = date.split("-").reverse().join("-");
        return (
            <div className="mt-4 container headMeetingItems">
                <div className="row pt-2">
                    <div className="col pr-2">
                        <button
                            type="button"
                            className="text-danger"
                            onClick={this.props.delMeeting.bind(this, id)} 
                            // data-toggle="modal"
                            // data-target="#DeleteModal"
                            style={{ background: 'transparent', border: 'none', float: 'right' }}
                        >
                            <span className="mb-0" aria-hidden="true">
                                <i className="far fa-trash-alt"></i>
                            </span>
                        </button>
                    </div>
                </div>

                <div className="text-left p-3">
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
                {/* <div className="modal fade" id="DeleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    id="feed_id"
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.props.delMeeting.bind(this,id)}
                                    data-dismiss="modal"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>        
        )
    }
}
export default MeetingItem;