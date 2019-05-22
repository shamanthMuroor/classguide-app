import React from 'react';

class MeetingItem extends React.Component{
    render() {
        const { id, date, agenda, minutes } = this.props.meeting;
        return (
            <div className="mt-2">
                <div id="accordion">
                    <div className="card" >
                        <div className="card-header" id="heading">
                            <button className="btn" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                <span >{date}  </span>  
                            </button>
                            <button className="btn" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                <span >{agenda}</span>
                            </button>                  
                                <button type="button" className="close" aria-label="Close" onClick={this.props.delMeeting.bind(this, id)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div id={id} className="collapse hide" aria-labelledby="heading" data-parent="#accordion">
                            <div className="card-body">
                                {minutes} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MeetingItem;