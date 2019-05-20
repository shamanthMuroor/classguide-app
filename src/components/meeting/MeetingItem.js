import React from 'react';
import PropTypes from 'prop-types';

class MeetingItem extends React.Component{
    render() {
        const { id, date, agenda, minutes } = this.props.meeting;
        return (
            <div className="mt-2">
                <div id="accordion">
                    <div className="card" >
                        <div className="card-header" id="heading">
                            <button className="btn" data-toggle="collapse" data-target={'#'+id} aria-expanded="false" aria-controls={id}>
                                <span >{date} | </span>
                                <span >{agenda}</span>
                            </button>
                                <button style={btnStyle} onClick={this.props.delMeeting.bind(this, id)}>x</button>
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

//PropTypes
MeetingItem.propTypes = {
    meeting: PropTypes.object.isRequired,
    delMeeting: PropTypes.func.isRequired
}

const btnStyle = {
    background: "#ff0000",
    color: '#fff',
    padding: '3px 10px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default MeetingItem;