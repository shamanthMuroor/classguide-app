import React from 'react';
import ParentMeetingItem from './ParentMeetingItem';

class ViewParentMeeting extends React.Component {
  render() {
    let html = 
      <React.Fragment>
        <h3>No Parent Meeting data Found</h3>
        <small style={{color:'gray'}}>(Note:  Please check your internet connection)</small>
      </React.Fragment>
      
    if (this.props.parentmeetings.length > 0) {
      html = this.props.parentmeetings.map((parentmeeting, i) => {
        return ( <ParentMeetingItem key={i} parentmeeting={parentmeeting} delMeeting={this.props.delMeeting} isDeleting={this.props.isDeleting} userId={this.props.userId} /> )
      })
    }
    return html
  }
}

export default ViewParentMeeting;