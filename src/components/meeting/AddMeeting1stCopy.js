import React from 'react';
import PropTypes from 'prop-types';
import MasterForm from './meetingForm/MasterForm';

class AddMeeting extends React.Component{
    state = {
              showComponent: false,
    }
    // }

    // onChange = (e) => {
    //     // console.log(e.target.name + " " + e.target.value)
    //     this.setState({ [e.target.name]: e.target.value})
    // }

    // onSubmit = (e) => {
    //     e.preventDefault();
    //     db.collection("classMeetings").add({
    //         agenda: this.state.agenda,
    //         date: this.state.date,
    //         minutes: this.state.minutes
    //     })
    //     .then((docRef)=> {
    //         alert("Meeting added successfully") 
    //         console.log("Added id: " + docRef.id)
    //         this.props.addMeeting(docRef.id, this.state.agenda, this.state.date, this.state.minutes)
    //         this.setState({ 
    //             date: 0,
    //             agenda: '',
    //             minutes: ''
    //         })
    //     })
    //     .catch(err => console.log(err))

    // }

    // formSetup = () => {
    //     <MasterForm addMeeting={this.addMeeting} />
    // }


    // _onButtonClick = () => {
    //     this.setState({
    //       showComponent: true,
    //       isHidden: true          
    //     });
    //   }
    
    toggleHidden = () => {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

    render() {
        return (
            <div>
                <button 
                    type="button" 
                    onClick={this.toggleHidden}
                    // onClick={this._onButtonClick}
                    style={{height: '250px', width: '250px', border: '1px dotted black', borderRadius: '20px'}}
                >
                    <div> 
                        <i className="fas fa-plus fa-10x"></i>
                    </div>
                </button>
                {!this.state.isHidden && <MasterForm addMeeting={this.addMeeting} /> }
                {/* { this.state.showComponent ? <MasterForm addMeeting={this.addMeeting} />  : null  } */}

            </div>
        )
    }
}

//PropTypes
AddMeeting.propTypes = {
    addMeeting: PropTypes.func.isRequired
}

export default AddMeeting;