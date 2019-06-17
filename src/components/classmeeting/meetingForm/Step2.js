import React from 'react';

function Step2(props) {
	if (props.currentStep !== 2) {
		return null
	}
	return (
		<div className="form-group" style={{ height: '215px', margin: '-15px 0px 0px 0px' }} >
			<label className="h5">Agenda</label>
			{props.error && <div className="alert alert-danger m-1 p-0" role="alert">
				{props.error}
			</div>}
			<div style={{ padding: '10px', paddingTop: '40px' }}>
				<select
					className="form-control"
					id="agenda"
					name="agenda"
					value={props.agenda}
					onChange={props.handleChange}
				>
					<option>Select Meeting Agenda</option>
					<option>Planning the activities for the academic year / Getting the student profile entries filled or typed</option>
					<option>Preparation for first internal test / Attendance/Preparation for UTSAV</option>
					<option>Evaluation of first internals / Attendance / Preparation for UTSAV</option>
					<option>Class get together / Planning for Educational tours / Industrial visits / Science Centers</option>
					<option>Preparation for final exam / Preparation for College Fest </option>
					<option>Unplanned meeting 1</option>
					<option>Unplanned meeting 2</option>
					<option>Unplanned meeting 3</option>
				</select>
			</div>
		</div>
	);
}
export default Step2;