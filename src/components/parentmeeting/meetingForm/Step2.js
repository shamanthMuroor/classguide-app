import React from 'react';

function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
        <div className="form-group" style={{margin: '-15px 0px 4px 0px'}}>
          <label className="h6">Agenda</label>
          { props.error && <div className="alert alert-danger mb-1 p-0" role="alert">
          {props.error}
          </div> }
            <textarea
                className="form-control"
                id="agenda"
                name="agenda"
                rows="7"
                cols="30"
                placeholder="agenda"
                value={props.agenda}
                onChange={props.handleChange}
            >
            </textarea>
        </div>
    );
  }
export default Step2;