// ClassMeeting --> (AddMeeting + ViewMeeting)  --> (MasterForm/MeetingItem) --> Step1/Step2/Step3
import React from 'react';
import '../styles/style.css';
import ViewMeeting from './classmeeting/ViewMeeting';
import AddMeeting from './classmeeting/AddMeeting';
import {db} from '../App';

class ClassMeetings extends React.Component {
  state = {
    lecturer: "lec1",
    sec: "3rd bsc Ecsm",
    meetings: []
  }

  // Displaying all the meetings from the database
  componentWillMount = () => {
    db.collection('classMeetings').doc(this.state.lecturer)
      .collection(this.state.sec).get()
        .then(res => { res.forEach(val => {
          let arr = [];
          arr.push({
            id: val.id,
            ...val.data() 
        })
          // console.log((val.id))
          // console.log((val.data().agenda))
          //  this.setState({meetings: [this.state.meetings, val.data()]} )
          this.setState({meetings: this.state.meetings.concat(arr)} )
        })
      })
      .catch(err => console.log(err))
  }

  // Delete a meeting
  delMeeting = (id) => {
    db.collection('classMeetings').doc(this.state.lecturer)
      .collection(this.state.sec).doc(id).delete()
        .then(() => {
          // alert('Deleted successfully')
          console.log(id + " del successful")
          this.setState({ meetings: [...this.state.meetings.filter(meeting => meeting.id !== id)] })
        })
        .catch(err => console.log(err))
  }

  // Add Meeting
  addMeeting = (id, agenda, date, description) => {
    const newMeeting = {
      id,
      agenda, 
      date, 
      description
    }
    this.setState({meetings: this.state.meetings.concat(newMeeting) })
  }

  render() {
    return (
      <div>
        <AddMeeting addMeeting={this.addMeeting} />
        <div>
          <ViewMeeting meetings={this.state.meetings} delMeeting = {this.delMeeting} />
        </div>
      </div>
    )
  }
}

export default ClassMeetings;
