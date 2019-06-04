import React from 'react';

function AddNonAcadAchievers(props) {
    return (
        <React.Fragment>
            <button
                type="button"
                className="close"
                aria-label="Close"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Close"
                onClick={props.hideNonAcadAchievers}
            >
                <p aria-hidden="true">&times;</p>
            </button>
            <form>
                <h3 className="text-center">Add Non Academic Achievers</h3>
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
                    <label className="h5">Motivation</label>
                    <div>
                        <input
                            className="form-control"
                            id="motivation"
                            name="motivation"
                            type="text"
                            placeholder="Measures taken achieve Higher levels "
                            value={props.motivation}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={props.addNonAcadAchievers} 
                >
                    Submit
                </button>
            </form>
        </React.Fragment>
    )
}
export default AddNonAcadAchievers;