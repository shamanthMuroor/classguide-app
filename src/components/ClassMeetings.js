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
    meetings: [],
    loading: true
  }

  // Displaying all the meetings from the database
  componentWillMount = () => {
    db.collection('classMeetings').doc(this.state.lecturer)
      .collection(this.state.sec).orderBy("date").get()
        .then(res => { res.forEach(val => {
          let arr = [];
          arr.push({
            id: val.id,
            ...val.data() 
        })
          this.setState({meetings: this.state.meetings.concat(arr), loading: false})
        })
      })
      .catch(err => console.log(err))
  }

  componentWillUnmount = () => {
    this.setState({
      lecturer: "",
      sec: "",
      meetings: [],
      loading: true
    })
  }

  // Delete a meeting
  delMeeting = (id) => {
    db.collection('classMeetings').doc(this.state.lecturer)
      .collection(this.state.sec).doc(id).delete()
        .then(() => {
          // console.log(id + " del successful")
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
    let html = 
      <div className="text-center" style={{marginBottom: '150px', marginTop: '-25px'}}>
        <div className="spinner-grow mr-1" role="status"> </div>
        <div className="spinner-grow mx-2" role="status"> </div>
        <div className="spinner-grow ml-1" role="status"> </div>
      </div>
    return (
      <div className="container">
        <AddMeeting addMeeting={this.addMeeting} />
        {this.state.loading ? html : <ViewMeeting meetings={this.state.meetings} delMeeting = {this.delMeeting} /> }
      </div>
    )
  }
}

export default ClassMeetings;
