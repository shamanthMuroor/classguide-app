import React from 'react';

class MeetingItem extends React.Component{
    render() {
        const { id, date, agenda, minutes } = this.props.meeting;
        return (
            <div className="mt-2">
                <div id="accordion">
                    <div className="card" >
                        <div className="card-header" id="heading">
                            <div>
                            <button className="btn" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                <span>{date}  </span>  
                            </button>
                            <button type="button" className="close" aria-label="Close" onClick={this.props.delMeeting.bind(this, id)}  data-toggle="tooltip" data-placement="bottom" title="Delete this meeting">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            
                            </div>
                            <button className="btn" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                            <p><b style={{fontWeight:'bolder'}}>Agenda: </b><span>{agenda}</span></p>
                            </button>   
                        </div>
                        <div id={id} className="collapse hide" aria-labelledby="heading" data-parent="#accordion">
                            <div className="card-body">
                                <span style={{fontWeight:'bolder'}}>Minutes:</span> {minutes} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MeetingItem;