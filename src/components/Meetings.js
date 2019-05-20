// Meeting --> (AddMeeting + Meet)  --> (MasterForm/MeetingItem) --> Step1/Step2/Step3
import React from 'react';
import '../styles/style.css';
import Meet from './meeting/Meet';
import AddMeeting from './meeting/AddMeeting';
import {db} from '../App';

class Meetings extends React.Component {
  state = {
    lecturer: "lec1",
    sec: "3rd bsc Ecsm",
    meetings: []
  }

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

  delMeeting = (id) => {
    // console.log(id)
    db.collection('classMeetings').doc(this.state.lecturer)
      .collection(this.state.sec).delete(id)
        .then(() => {
          alert('Deleted successfully')
          console.log("del successful")
          this.setState({ meetings: [...this.state.meetings.filter(meeting => meeting.id !== id)] })
        })
        .catch(err => console.log(err))
  }

  // Add Meeting
  addMeeting = (id, agenda, date, minutes) => {
    const newMeeting = {
      id,
      agenda, 
      date, 
      minutes
    }
    this.setState({meetings: this.state.meetings.concat(newMeeting) })
  }

  render() {

    // console.log(this.state)
    return (
      <div className="container">
        <AddMeeting addMeeting={this.addMeeting} />
        {/* <MasterForm addMeeting={this.addMeeting}/> */}
        <div style={{marginTop: '10px'}}>
          <Meet meetings={this.state.meetings} delMeeting = {this.delMeeting} />
        </div>
      </div>
    )
  }
}

export default Meetings;
