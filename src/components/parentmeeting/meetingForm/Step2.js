import React from 'react';

function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
        <div className="form-group" style={{margin: '-15px 0px 4px 0px'}}>
          {props.error && <div className="alert alert-danger m-1 p-0" role="alert">
            {props.error}
          </div>}    
        <label className="h6">Parent/Guardian Attended</label>
        <div style={{padding: '5px'}}>
          <input
            className="form-control"
            id="attended"
            name="attended"
            type="text"
            placeholder="Parent/Guardian name"
            value={props.attended}
            onChange={props.handleChange}
          />
          </div>
          <hr />
          <label className="h6">Agenda</label>
          <div style={{padding: '5px'}}>
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