import React from 'react';
import ParentMeetingItem from './ParentMeetingItem';

class ViewParentMeeting extends React.Component {
  render() {
    // let html = <h3>No Parent Meetings data Found</h3>
    // if(this.props.parentmeetings.length > 0 ) {
      return this.props.parentmeetings.map((parentmeeting) => (
        <ParentMeetingItem key={parentmeeting.id} parentmeeting={parentmeeting} delMeeting = {this.props.delMeeting} editMeeting={this.props.editMeeting} />
      ))
    // }
  }
}

export default ViewParentMeeting;