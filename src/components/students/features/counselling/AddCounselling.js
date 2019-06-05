import React from 'react';

function AddCounselling(props) {
    return (
        <React.Fragment>
            <button
                type="button"
                className="close"
                aria-label="Close"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Close"
                onClick={props.hideCounselling}
            >
                <p aria-hidden="true">&times;</p>
            </button>
            <form style={{ marginTop: '100px' }}>
                <h3 className="text-center">Add Counselling Details</h3>
                <small style={{color: 'gray'}}>All fields are compulsory!</small>
                {
                    props.error && <div className="alert alert-danger" role="alert">
                        {props.error}
                    </div>
                }
                <div className="form-group mt-3" >
                    <label className="h5">Register Number</label>
                    <div>
                        <input
                            className="form-control"
                            id="regno"
                            name="regno"
                            type="number"
                            placeholder="Register Number"
                            value={props.regno}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="h5">Student Name</label>
                    <div>
                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Student Name"
                            value={props.name}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="h5">Marks</label>
                    <div>
                        <input
                            className="form-control"
                            id="marks"
                            name="marks"
                            type="number"
                            placeholder="Enter Marks(%)"
                            value={props.marks}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="h5">Reason</label>
                    <div>
                        <input
                            className="form-control"
                            id="reason"
                            name="reason"
                            type="text"
                            placeholder="Reason"
                            value={props.reason}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="h5">Measures taken</label>
                    <div>
                        <input
                            className="form-control"
                            id="measures"
                            name="measures"
                            type="text"
                            placeholder="Measures taken"
                            value={props.motivation}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="h5">Output</label>
                    <div>
                        <input
                            className="form-control"
                            id="output"
                            name="output"
                            type="text"
                            placeholder="Output"
                            value={props.output}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={props.addCounselling} 
                >
                    Submit
                </button>
            </form>
        </React.Fragment>
    )
}
export default AddCounselling;