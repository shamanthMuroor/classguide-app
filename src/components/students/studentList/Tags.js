import React from 'react';

class Tags extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="row m-2 justify-content-center tagBtn1 d-print-none">
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" type="button" name="sc" onClick={this.props.search}>SC/ST</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1 ">
                        <button className="btn btn-outline-dark" name="" disabled>Rural</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" name="" type="button" disabled>Slow learners</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1" >
                        <button className="btn btn-outline-dark" name="" type="button" disabled>Achievers</button>
                    </div>
                    {/* <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" name="scst" type="button">Peer Group Learning</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" name="scst" type="button">Attendance shortage</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" name="scst" type="button">Student achievers (Non Academic Areas)</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" name="scst" type="button">Student achievers</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" name="scst" type="button">Students with special attention/ Counselling</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" name="scst" type="button">Students Not Completed Sahaya Programme</button>
                    </div> */}
                </div>
            </React.Fragment>

        )
    }
}

export default Tags
