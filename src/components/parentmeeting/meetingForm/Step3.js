import React from 'react';

function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>
        <div className="form-group" style={{margin: '-15px 0px 4px 0px'}}>
          <label className="h5">Description</label>
          { props.error && <div className="alert alert-danger mb-1 p-0" role="alert">
          {props.error}
          </div> }
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
        <button className="btn btn-success" style={{float:'right'}} disabled={props.isLoading}>
          {props.isLoading ? "Submitting..." : "Submit"}
        </button>
      </React.Fragment>
    );
  }

export default Step3;


