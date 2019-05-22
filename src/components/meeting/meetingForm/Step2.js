import React from 'react';

function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
        <div className="form-group">
            <label>Agenda</label>
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