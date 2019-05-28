import React from 'react';


class Tags extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="row m-2 justify-content-center tagBtn1">
                    {/* <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" type="button" name="" onClick={this.props.search}>SC/ST</button>
                    </div> */}


                    <div className="col-sm-6 col-md-2 my-1 ">
                        <button className="btn btn-outline-dark" name="rural" onClick={this.props.search} type="button">Rural</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1 ">
                        <button className="btn btn-outline-dark" name="urban" onClick={this.props.search} type="button">Urban</button>
                    </div>
                    
                    
                    {/* <div className="col-sm-6 col-md-2 my-1" >
                        <button className="btn btn-outline-dark" type="button">Academic Achievers</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" type="button">Slow learners</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" type="button">Peer Group Learning</button>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1">
                        <button className="btn btn-outline-dark" type="button">Attendance shortage</button>
                    </div> */}
                </div>
                {/* <div className="row m-2 mb-5 justify-content-center tagBtn2">
                    <div className="col-md-3 m-1">
                        <button className="btn btn-outline-dark" type="button">Student achievers (Non Academic Areas)</button>
                    </div>
                    <div className="col-md-3 m-1">
                        <button className="btn btn-outline-dark" type="button">Student achievers</button>
                    </div>
                    <div className="col-md-3 m-1">
                        <button className="btn btn-outline-dark" type="button">Students with special attention/ Counselling</button>
                    </div>
                    <div className="col-md-3 m-1">
                        <button className="btn btn-outline-dark" type="button">Students Not Completed Sahaya Programme</button>
                    </div>
                </div> */}
            </React.Fragment>

        )
    }
}

export default Tags
