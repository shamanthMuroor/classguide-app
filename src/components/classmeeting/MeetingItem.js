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
                                    <button type="button" className="close text-white" aria-label="Close" onClick={this.props.delMeeting.bind(this, id)}  data-toggle="tooltip" data-placement="bottom" title="Delete this meeting">
                                    <span className="mb-0" aria-hidden="true"><small class="align-middle" style={{fontSize: '12px'}}>Delete</small>&times;</span>
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
                                    <button className="btn text-white" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                        <span>{date}</span>  
                                    </button> 
                                </div>
                                <div className="col-md-5">
                                    <button className="btn agenda text-white" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                        <span>{agenda}</span>
                                    </button> 
                                </div>
                                <div className="col-md-4 d-none d-md-flex">
                                    <button className="btn description text-white" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                        <span>{description}</span>
                                    </button> 
                                </div>  
                            </div>
                        </div>
                            
                        <div id={id} className="collapse hide" aria-labelledby="headMeetingItems" data-parent="#accordion">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <span style={{fontWeight:'bold', color: 'gray'}}>Date: </span><span>{date}</span> 
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
                    </div>
                </div>
            </div>
        )
    }
}
export default MeetingItem;