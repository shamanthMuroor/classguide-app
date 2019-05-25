import React from 'react';
import '../../styles/style.css'

class ParentMeetingItem extends React.Component {
    render() {
        const { id, reg, date, agenda, description } = this.props.parentmeeting;
        return (
            <React.Fragment>
                <div className="parentMeetingItem">
                    <span>{date} </span>
                    <span>{reg} </span>
                    <span>{agenda} </span>
                    <span>{description} </span>
                    <button type="button" className="close" aria-label="Close" onClick={this.props.delMeeting.bind(this, id)}  data-toggle="tooltip" data-placement="bottom" title="Delete this meeting">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </React.Fragment>
    )}
}
export default ParentMeetingItem;