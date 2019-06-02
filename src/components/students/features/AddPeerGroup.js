import React from 'react';

function AddPeerGroup(props) {
    return (
        <form style={{marginTop: '150px'}}>
            <div className="form-group" >
                <label className="h5">Register Number</label>
                {/* {props.error && <div className="alert alert-danger m-1 p-0" role="alert">
                    {props.error}
                </div>} */}
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
                <label className="h5">Student Learner's Name</label>
                {/* {props.error && <div className="alert alert-danger m-1 p-0" role="alert">
                    {props.error}
                </div>} */}
                <div>
                    <input
                        className="form-control"
                        id="student_learner"
                        name="student_learner"
                        type="text"
                        placeholder="Student Learner's Name"
                        value={props.student_learner}
                        onChange={props.handleChange}
                    />
                </div>
            </div>
            <div className="form-group" >
                <label className="h5">Marks</label>
                {/* {props.error && <div className="alert alert-danger m-1 p-0" role="alert">
                    {props.error}
                </div>} */}
                <div>
                    <input
                        className="form-control"
                        id="Marks"
                        name="marks"
                        type="number"
                        placeholder="Enter Marks(%)"
                        value={props.marks}
                        onChange={props.handleChange}
                    />
                </div>
            </div>
            <div className="form-group" >
                <label className="h5">Student Guide Name</label>
                {/* {props.error && <div className="alert alert-danger m-1 p-0" role="alert">
                    {props.error}
                </div>} */}
                <div>
                    <input
                        className="form-control"
                        id="student_guide"
                        name="student_guide"
                        type="text"
                        placeholder="Student Guide's Name"
                        value={props.student_guide}
                        onChange={props.handleChange}
                    />
                </div>
            </div>
            <div className="form-group" >
                <label className="h5">Measures Taken</label>
                {/* {props.error && <div className="alert alert-danger m-1 p-0" role="alert">
                    {props.error}
                </div>} */}
                <div>
                    <input
                        className="form-control"
                        id="measures"
                        name="measures"
                        type="text"
                        placeholder="Measures taken"
                        value={props.measures}
                        onChange={props.handleChange}
                    />
                </div>
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={props.addPeerGroup}
            >
                submit
            </button>
        </form>
    )
}
export default AddPeerGroup;