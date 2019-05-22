import React from 'react';
import '../../../styles/style.css';

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div className="form-group" style={{height:'215px'}} >
        <label>Date</label>
        <div style={{padding: '10px', paddingTop: '40px'}}>
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