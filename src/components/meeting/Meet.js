import React from 'react';
import MeetingItem from './MeetingItem';
import PropTypes from 'prop-types';

class Meet extends React.Component{
    render() {
        return this.props.meetings.map((meeting) => (
            <MeetingItem key={meeting.id} meeting={meeting} 
            delMeeting = {this.props.delMeeting} />
        ));
    }
}

//PropTypes
Meet.propTypes = {
    meetings: PropTypes.array.isRequired,
    delMeeting: PropTypes.func.isRequired
}

export default Meet;
