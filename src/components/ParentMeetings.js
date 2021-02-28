import React from 'react';
import '../styles/style.css';
import ViewParentMeeting from './parentmeeting/ViewParentMeeting';
import AddParentMeeting from './parentmeeting/AddParentMeeting';
import { db } from '../App';
// import jwt_decode from 'jwt-decode';

class ParentMeetings extends React.Component {
	state = {
		user: {id: "5cef889e91c2fe210298755c"},
		showParentMeetings: false,
		parentmeetings: [],
		id: '',
		loading: true,
		isDeleting: false
	}

	// Displaying all the meetings from the database
	componentWillMount = () => {
		// if (localStorage.staffAuth) {
			// let val = JSON.parse(localStorage.getItem("staffAuth"))
			// this.setState({ user: jwt_decode(val.token) })
			db.collection('general').doc(this.state.user.id)
				.collection("parentMeetings").orderBy("date").get()
				.then(res => {
					if (res.size > 0) {
						res.forEach(val => {
							let arr = [];
							arr.push({
								id: val.id,
								...val.data()
							})
							this.setState({ parentmeetings: this.state.parentmeetings.concat(arr), loading: false })
						})
					}
					else {
						this.setState({ loading: false })
					}
				})
				.catch(err => console.log(err))
		// }
		// else
		// 	this.props.history.push('/error')
	}

	// Add Meeting
	addParentMeeting = (id, reg, agenda, date, attended, description) => {
		const newMeeting = { id, reg, agenda, attended, date, description }
		this.setState({ parentmeetings: this.state.parentmeetings.concat(newMeeting) })
	}

	// Delete a meeting
	delMeeting = (id, cb) => {
		this.setState({ isDeleting: true })
		db.collection('general').doc(this.state.user.id)
			.collection("parentMeetings").doc(id).delete()
			.then(() => {
				// console.log(id + " del successful")
				this.setState({ parentmeetings: [...this.state.parentmeetings.filter(meeting => meeting.id !== id)], isDeleting: false })
				cb();
			})
			.catch(err => console.log(err))
	}

	render() {
		let loader =
			<div className="text-center" style={{ marginBottom: '150px', marginTop: '-25px' }}>
				<div className="spinner-grow mr-1" role="status"> </div>
				<div className="spinner-grow mx-2" role="status"> </div>
				<div className="spinner-grow ml-1" role="status"> </div>
			</div>
		return (
			<div className="container text-center">
				<AddParentMeeting addParentMeeting={this.addParentMeeting} userId={this.state.user.id} />

				{this.state.loading
					?
					loader
					:
					<ViewParentMeeting parentmeetings={this.state.parentmeetings} delMeeting={this.delMeeting} isDeleting={this.state.isDeleting} userId={this.state.user.id} />
				}
			</div>
		)
	}
}


export default ParentMeetings;
