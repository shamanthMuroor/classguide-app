import React from 'react';

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div className="form-group">
        <label>Date</label>
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
    );
  }
  

export default Step1;