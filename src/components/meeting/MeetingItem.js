import React from 'react';
import '../../styles/style.css'

class MeetingItem extends React.Component{
    render() {
        const { id, date, agenda, minutes } = this.props.meeting;
        return (
            <div className="mt-4">
                <div id="accordion">
                    <div className="card">
                        <div className="card-header" id="headMeetingItems">  
                            <div className="row mr-0">
                                <div className="col p-0"> 
                                    <button className="btn p-0" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                       <small>View</small> 
                                    </button> 
                                </div>
                                <div className="col">
                                    <button type="button" className="close text-white" aria-label="Close" onClick={this.props.delMeeting.bind(this, id)}  data-toggle="tooltip" data-placement="bottom" title="Delete this meeting">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>

                            <div className="row meetingListHeadings d-none d-md-flex">
                                <div className="col-md-3">Date</div>
                                <div className="col-md-5">Agenda</div>
                                <div className="col-md-4">Minutes</div>
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
                                    <button className="btn minutes text-white" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                        <span>{minutes}</span>
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
                                        <span style={{fontWeight:'bold', color: 'gray'}}>Minutes: </span><span>{minutes}</span> 
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