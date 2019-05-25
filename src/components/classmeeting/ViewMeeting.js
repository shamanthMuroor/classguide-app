import React from 'react';
import MeetingItem from './MeetingItem';

class ViewMeeting extends React.Component{
    render() {
        return this.props.meetings.map((meeting) => (
            <MeetingItem key={meeting.id} meeting={meeting} 
            delMeeting = {this.props.delMeeting} />
        ));
    }
}

export default ViewMeeting;
