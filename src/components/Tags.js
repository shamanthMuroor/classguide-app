import React from 'react';


class Tags extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="row m-2 justify-content-center tagBtn1 d-print-none">
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" type="button" name="scst" onClick={this.props.search}>SC/ST</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1 ">
                        <button className="btn btn-outline-dark" name="rural" onClick={this.props.search} type="button">Rural</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1 ">
                        <button className="btn btn-outline-dark" name="urban" onClick={this.props.search} type="button">Urban</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1" >
                        <button className="btn btn-outline-dark" name="" type="button">Academic Achievers</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" name="" type="button">Slow learners</button>
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
                 {/* </div> */}
            </React.Fragment>

        )
    }
}

export default Tags
