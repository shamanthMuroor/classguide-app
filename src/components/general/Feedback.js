import React from "react";
import { db } from '../../App';
import jwt_decode from 'jwt-decode';

class Feedback extends React.Component {
	state = {
		user: false,
		feedback: '',
		submitting: false,
		showSuccess: false
	}

	componentWillMount = () => {
		if (localStorage.staffAuth) {
			let val = JSON.parse(localStorage.getItem("staffAuth"))
			this.setState({ user: jwt_decode(val.token) })
		}
		else {
			this.props.history.push('/error')
		}
	}

	handleSubmit = () => {
		this.setState({ submitting: true, showSuccess: false })
		db.collection('feedback').add({
			feedback: this.state.feedback,
			name: this.state.user.name
		})
			.then(() => {
				console.log("feedback submitted")
				this.setState({ feedback: '', submitting: false, showSuccess: true })
			})
			.catch((err) => console.log(err))
	}

	handleChange = (e) => {
		this.setState({ feedback: e.target.value })
	}

	hideSuccess = () => {
		this.setState({ showSuccess: false })
	}

	render() {
		let success =
			<div className="alert alert-success alert-dismissible fade show" role="alert">
				<strong>Success!</strong> Parent Meeting added successfully
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

		return (
			<div className="container">
				<div className="card" style={{ marginTop: "130px" }}>
					<div className="card-body text-center">
						<label>Select your feedback category below</label>
						<div
							className="btn-group btn-group-toggle container"
							data-toggle="buttons"
						>
							<label className="btn btn-outline-secondary active">
								<input
									type="radio"
									name="options"
									id="option1"
									autoComplete="off"
								/>{" "}
								suggestion
              				</label>
							<label className="btn btn-outline-secondary ">
								<input
									type="radio"
									name="options"
									id="option2"
									autoComplete="off"
								/>{" "}
								Bug/Complaint
              				</label>
						</div>
					</div>
					<hr />

					<form className="container">
						{this.state.showSuccess && success}
						<div className="form-group text-center">
							<label>Please enter your feedback</label>
							<textarea
								className="form-control"
								id="exampleFormControlTextarea1"
								rows="3"
								onChange={this.handleChange}
								value={this.state.feedback}
								style={{ height: "250px" }}
							/>
						</div>
						<button type="submit" className="btn btn-primary mb-2 float-right" onClick={this.handleSubmit} disabled={this.state.submitting}>
							{this.state.submitting ? "Submitting.." : "Submit"}
						</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Feedback;
