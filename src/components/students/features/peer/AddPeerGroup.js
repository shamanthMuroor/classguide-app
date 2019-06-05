import React from 'react';

function AddPeerGroup(props) {
    return (
        <React.Fragment>
            <button
                type="button"
                className="close"
                aria-label="Close"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Close"
                onClick={props.hideAddPeerGroup}
            >
                <p aria-hidden="true">&times;</p>
            </button>
            <form style={{ marginTop: '100px' }}>
                <h3 className="text-center">Add Peer Group</h3>
                {
                    props.error && <div className="alert alert-danger" role="alert">
                        {props.error}
                    </div>
                }
                <div className="form-group mt-3" >
                    <label className="h5">* Register Number</label>
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
                    <label className="h5">* Student Learner's Name</label>
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
                    <label className="h5">* Marks</label>
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
                    <label className="h5">Comment<small style={{color: 'gray'}}> (ex: Subject)</small></label>
                    <div>
                        <input
                            className="form-control"
                            id="comment"
                            name="comment"
                            type="text"
                            placeholder="Enter Comment"
                            value={props.comment}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="h5">* Student Guide Name</label>
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
                    <label className="h5">* Measures Taken</label>
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
                Submit
            </button>
            </form>
        </React.Fragment>
    )
}
export default AddPeerGroup;