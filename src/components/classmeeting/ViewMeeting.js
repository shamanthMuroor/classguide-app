import React from 'react';
import MeetingItem from './MeetingItem';

class ViewMeeting extends React.Component {
    render() {
        let html = 
            <React.Fragment>
                <h3>No Class Meeting data Found</h3>        
                <small style={{color:'gray'}}>(Note: Please check your internet connection)</small>
            </React.Fragment>
        if (this.props.meetings.length > 0) {
            html = this.props.meetings.map((meeting, i) => (
                <MeetingItem key={i} meeting={meeting} delMeeting={this.props.delMeeting} isDeleting={this.props.isDeleting} userId={this.props.userId} />
            ))
        }
        return html
    }
}

export default ViewMeeting;