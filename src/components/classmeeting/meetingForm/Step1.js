import React from 'react';
import '../../../styles/style.css';

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  }
  return (
    <div className="form-group" style={{ height: '215px', margin: '-15px 0px 0px 0px' }} >
      <label className="h5">Date</label>
        {props.error && <div className="alert alert-danger m-1 p-0" role="alert">
          {props.error}
        </div>}
      <div style={{ padding: '10px', paddingTop: '40px' }}>
        <input
          className="form-control"
          id="Date"
          name="date"
          type="date"
          placeholder="Enter Date"
          value={props.date}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}


export default Step1;