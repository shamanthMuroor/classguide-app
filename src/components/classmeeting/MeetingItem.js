import React from 'react';
import '../../styles/style.css'

class MeetingItem extends React.Component{
    render() {
        const { id, date, agenda, description } = this.props.meeting;
        return (
            <div className="mt-4">
                <div id="accordion">
                    <div className="card mi">
                        <div className="card-header" id="headMeetingItems">  
                            <div className="row mr-0">
                                <div className="col p-0"> 
                                    <button className="btn pl-1" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                       <small>View</small> 
                                    </button> 
                                </div>
                                
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

                            <div className="row meetingListHeadings d-none d-md-flex">
                                <div className="col-md-3">Date</div>
                                <div className="col-md-5">Agenda</div>
                                <div className="col-md-4">Description</div>
                            </div>
                            <div className="row  mr-0">
                                <div className="col-md-3 text-center">
                                    <button 
                                        className="btn" 
                                        style={{color: '#e2d5d5'}} 
                                        data-toggle="collapse" 
                                        data-target={'#'+id} 
                                        aria-expanded="false" 
                                        aria-controls={id}
                                    >
                                        <span>{date}</span>  
                                    </button> 
                                </div>
                                <div className="col-md-5">
                                    <button 
                                        className="btn agenda" 
                                        style={{color: '#e2d5d5'}} 
                                        data-toggle="collapse" 
                                        data-target={'#'+id} 
                                        aria-expanded="false" 
                                        aria-controls={id}
                                    >
                                        <span>{agenda}</span>
                                    </button> 
                                </div>
                                <div className="col-md-4 d-none d-md-flex">
                                    <button 
                                        className="btn description" 
                                        style={{color: '#e2d5d5'}} 
                                        data-toggle="collapse" 
                                        data-target={'#'+id} 
                                        aria-expanded="false" 
                                        aria-controls={id}
                                    >
                                        <span>{description}</span>
                                    </button> 
                                </div>  
                            </div>
                        </div>
                            
                        <div id={id} className="collapse hide" aria-labelledby="headMeetingItems" data-parent="#accordion">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <span style={{fontWeight:'bold', color: 'gray'}}>Date: </span>
                                        <span>{date}</span> 
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12">
                                        <span style={{fontWeight:'bold', color: 'gray'}}>Agenda: </span><span>{agenda}</span> 
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12">
                                        <span style={{fontWeight:'bold', color: 'gray'}}>Description: </span><span>{description}</span> 
                                    </div>
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
                </div>
            </div>
        )
    }
}
export default MeetingItem;