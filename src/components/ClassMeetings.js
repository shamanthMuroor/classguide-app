// ClassMeeting --> (AddMeeting + ViewMeeting)  --> (MasterForm/MeetingItem) --> Step1/Step2/Step3
import React from 'react';
import '../styles/style.css';
import ViewMeeting from './classmeeting/ViewMeeting';
import AddMeeting from './classmeeting/AddMeeting';
import { db } from '../App';
import jwt_decode from 'jwt-decode';

class ClassMeetings extends React.Component {
	state = {
		meetings: [],
		loading: true,
		isDeleting: false,
		user: {}
	}

	// Displaying all the meetings from the database
	componentWillMount = () => {
		if (localStorage.staffAuth) {
			let val = JSON.parse(localStorage.getItem("staffAuth"))
			this.setState({ user: jwt_decode(val.token) })
			db.collection('general').doc(jwt_decode(val.token).id)
				.collection('classMeetings').orderBy("date").get()
				.then(res => {
					if (res.size > 0) {
						res.forEach(val => {
							let arr = [];
							arr.push({
								id: val.id,
								...val.data()
							})
							this.setState({ meetings: this.state.meetings.concat(arr), loading: false })
						})
					}
					else {
						this.setState({ loading: false })
					}
				})
				.catch(err => console.log(err))
		}
		else
			this.props.history.push('/error')
	}

	componentWillUnmount = () => {
		this.setState({
			lecturer: "",
			sec: "",
			meetings: [],
			loading: true,
			isDeleting: false
		})
	}

	// Delete a meeting
	delMeeting = (id, cb) => {
		this.setState({ isDeleting: true })
		db.collection('general').doc(this.state.user.id)
			.collection('classMeetings').doc(id).delete()
			.then(() => {
				// console.log(id + " del successful")
				this.setState({ meetings: [...this.state.meetings.filter(meeting => meeting.id !== id)], isDeleting: false })
				cb();
			})
			.catch(err => console.log(err))
	}

	// Add Meeting
	addMeeting = (id, agenda, date, description) => {
		const newMeeting = { id, agenda, date, description }
		this.setState({ meetings: this.state.meetings.concat(newMeeting) })
	}

	render() {
		// console.log(this.state.user)
		let loader =
			<div className="text-center" style={{ marginBottom: '150px', marginTop: '-25px' }}>
				<div className="spinner-grow mr-1" role="status"> </div>
				<div className="spinner-grow mx-2" role="status"> </div>
				<div className="spinner-grow ml-1" role="status"> </div>
			</div>
		return (
			<div className="container text-center">
				<AddMeeting addMeeting={this.addMeeting} userId={this.state.user.id} />
				{
					this.state.loading
					?
					loader
					:
					<ViewMeeting meetings={this.state.meetings} delMeeting={this.delMeeting} isDeleting={this.state.isDeleting} userId={this.state.user.id} />
				}
			</div>
		)
	}
}

export default ClassMeetings;
