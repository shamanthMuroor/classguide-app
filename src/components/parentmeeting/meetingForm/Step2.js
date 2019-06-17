import React from 'react';

function Step2(props) {
	if (props.currentStep !== 2) {
		return null
	}
	return (
		<div className="form-group" style={{ margin: '-15px 0px 4px 0px' }}>
			{props.error && <div className="alert alert-danger m-1 p-0" role="alert">
				{props.error}
			</div>}
			<label className="h6">Relationship with student</label>
			<div style={{ padding: '5px' }}>
				<select
					className="form-control"
					id="attended"
					name="attended"
					value={props.attended}
					onChange={props.handleChange}
				>
					<option>Select relationship</option>
					<option>Parent</option>
					<option>Brother/Sister</option>
					<option>Guardian</option>
				</select>
			</div>
			<hr />
			<label className="h6">Agenda</label>
			<div style={{ padding: '5px' }}>
				<textarea
					className="form-control"
					id="agenda"
					name="agenda"
					rows="2"
					cols="30"
					placeholder="Reason for calling"
					value={props.agenda}
					onChange={props.handleChange}
				>
				</textarea>
			</div>
		</div>
	);
}
export default Step2;