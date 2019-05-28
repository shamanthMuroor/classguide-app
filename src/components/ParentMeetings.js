import React from 'react';
import '../styles/style.css';
import ViewParentMeeting from './parentmeeting/ViewParentMeeting';
import AddParentMeeting from './parentmeeting/AddParentMeeting';
import {db} from '../App';

class ParentMeetings extends React.Component {
  state = {
    lecturer: "lec1",
    sec: "3rd bsc Ecsm",
    showParentMeetings: false,
    parentmeetings: [],
    loading: true
  }

  // Displaying all the meetings from the database
  componentWillMount = () => {
    db.collection('parentMeetings').doc(this.state.lecturer)
      .collection(this.state.sec).get()
        .then(res => { res.forEach(val => {
          let arr = [];
          arr.push({
            id: val.id,
            ...val.data() 
        })
          this.setState({parentmeetings: this.state.parentmeetings.concat(arr), loading: false} )
        })
      })
      .catch(err => console.log(err))
  }

    // Delete a meeting
    delMeeting = (id) => {
      db.collection('parentMeetings').doc(this.state.lecturer)
        .collection(this.state.sec).doc(id).delete()
          .then(() => {
            console.log(id + " del successful")
            this.setState({ parentmeetings: [...this.state.parentmeetings.filter(meeting => meeting.id !== id)] })
          })
          .catch(err => console.log(err))
    }

    // Add Meeting
    addParentMeeting = (id, reg, agenda, date, description) => {
      const newMeeting = {
        id,
        reg,
        agenda, 
        date, 
        description
      }
      this.setState({parentmeetings: this.state.parentmeetings.concat(newMeeting) })
    }

  render() {
    let html = 
      <div className="text-center" style={{marginBottom: '150px', marginTop: '-25px'}}>
        <div className="spinner-grow mr-1" role="status"> </div>
        <div className="spinner-grow mx-2" role="status"> </div>
        <div className="spinner-grow ml-1" role="status"> </div>
      </div>
    return (
      <div className="container text-center">
        <AddParentMeeting addParentMeeting={this.addParentMeeting} />
        {this.state.loading ? html : <ViewParentMeeting parentmeetings={this.state.parentmeetings} delMeeting={this.delMeeting} />}
      </div>
    )
  }
}


export default ParentMeetings;
