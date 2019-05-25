import React from 'react';
import '../../../styles/style.css';

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div className="form-group" style={{height:'215px'}} >        
        <label>Student Register Number</label>
        <div style={{padding: '10px'}}>
          <input
            className="form-control"
            id="reg"
            name="reg"
            type="number"
            placeholder="Enter Register number"
            value={props.reg}
            onChange={props.handleChange}
          />
        </div>
        <hr />
        <label>Date</label>
        <div style={{padding: '10px'}}>
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