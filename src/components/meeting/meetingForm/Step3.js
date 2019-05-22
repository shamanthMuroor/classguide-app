import React from 'react';

function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>
        <div className="form-group">
            <label>Minutes</label>
            <textarea
                className="form-control"
                id="minutes"
                name="minutes"
                rows="7"
                cols="30"
                type="text"
                placeholder="Enter minutes"
                value={props.minutes}
                onChange={props.handleChange}
            >
            </textarea>   
        </div>
        <button className="btn btn-success" style={{float:'right'}}>Submit</button>
      </React.Fragment>
    );
  }

export default Step3;


