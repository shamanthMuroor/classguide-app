import React from 'react';

function AddRural(props) {
    return (
        <React.Fragment>
            <button
                type="button"
                className="close"
                aria-label="Close"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Close"
                onClick={props.hideForm}
            >
                <p aria-hidden="true">&times;</p>
            </button>
            <form style={{ marginTop: '100px' }}>
                <h3 className="text-center">Add Rural Student Details</h3>
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
                    <label className="h5">* Student Name</label>
                    <div>
                        <input
                            className="form-control"
                            id="student_name"
                            name="student_name"
                            type="text"
                            placeholder="Student Learner's Name"
                            value={props.student_name}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="h5">* Overall Percentage</label>
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
                    <label className="h5">Motivations For Excellence</label>
                    <div>
                        <input
                            className="form-control"
                            id="motivation"
                            name="motivation"
                            type="text"
                            placeholder="motivation taken"
                            value={props.motivation}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={props.addRuralStudent} 
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
            </form>
        </React.Fragment>
    )
}
export default AddRural;