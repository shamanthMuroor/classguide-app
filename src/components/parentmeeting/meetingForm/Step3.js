import React from 'react';

function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>
        <div className="form-group">
            <label className="h5">Description</label>
            <textarea
                className="form-control"
                id="description"
                name="description"
                rows="7"
                cols="30"
                type="text"
                placeholder="Enter description"
                value={props.description}
                onChange={props.handleChange}
            >
            </textarea>   
        </div>
        <button className="btn btn-success" style={{float:'right'}}>Submit</button>
      </React.Fragment>
    );
  }

export default Step3;


