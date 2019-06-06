import React from 'react';
import ParentMeetingItem from './ParentMeetingItem';

class ViewParentMeeting extends React.Component {
  render() {
    let html = 
      <React.Fragment>
        <h3>No Parent Meeting data Found</h3>
        <small style={{color:'gray'}}>(Note: Maybe also due to network problem)</small>
      </React.Fragment>
    if (this.props.parentmeetings.length > 0) {
      html = this.props.parentmeetings.map((parentmeeting, i) => {
        return ( <ParentMeetingItem key={i} parentmeeting={parentmeeting} delMeeting={this.props.delMeeting} editMeeting={this.props.editMeeting} /> )
      })
    }
    return html
  }
}

export default ViewParentMeeting;