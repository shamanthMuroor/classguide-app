import React from 'react';

function AddVeSession(props) {
    return (
        <React.Fragment>
            <button
                type="button"
                className="close"
                aria-label="Close"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Close"
                onClick={props.hideVeSession}
            >
                <p aria-hidden="true">&times;</p>
            </button>
            <form style={{ marginTop: '100px' }}>
                <h3 className="text-center">Add Value Education Session</h3>                
                <small style={{color: 'gray'}}>All fields are compulsory!</small>
                <div className="form-group mt-3" >
                    <label className="h5">Date</label>
                    <div>
                    <input
                        className="form-control"
                        name="date"
                        type="date"
                        placeholder="Enter Date"
                        value={props.date}
                        onChange={props.handleChange}
                        />
                    </div>
                </div>                
                <div className="form-group" >
                    <label className="h5">Agenda</label>
                    <div>
                        <input
                            className="form-control"
                            name="agenda"
                            type="text"
                            placeholder="agenda"
                            value={props.agenda}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="h5">Description</label>
                    <div>
                        <input
                            className="form-control"
                            name="description"
                            type="text"
                            placeholder="Description"
                            value={props.description}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                {
                    props.error && <div className="alert alert-danger my-2" role="alert">
                        {props.error}
                    </div>
                }
                <div className="text-right">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={props.addVeSession} 
                        disabled={props.submitting}
                    >
                    { 
                        props.submitting 
                        ? 
                        <React.Fragment>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            <span> Submitting</span>
                        </React.Fragment>
                        : 
                        "Submit" 
                    }
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}
export default AddVeSession;