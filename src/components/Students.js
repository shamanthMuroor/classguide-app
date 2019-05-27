import React from 'react';
import StudList from './students/StudList';
import {db} from '../App';
import {Link} from 'react-router-dom';
import Search from './Search';

class Students extends React.Component {
    state = { 
        studs : [],
        search: ''
    }

    componentWillMount = () => {
        db.collection('students').get()
            .then(res => { res.forEach(val => {
                let arr = [];
                arr.push({
                    id: val.id,
                    ...val.data() 
                })
                this.setState({studs: this.state.studs.concat(arr)})
            })
        })
        .catch(err => console.log(err))
    }

    componentWillUnmount = () => {
        this.setState({studs: []})
    }

    updateSearch = (e) => {
        this.setState({search: e.target.value});
    }

    render() {
        let html = (
            <React.Fragment>
                <h2 className="text-center">Student List</h2>
                <div className="my-2">
                   <Search filterValue={this.updateSearch} search={this.state.search}/>
                </div>
                <hr />
                {/* <div className="row m-2 justify-content-center tagBtn1">
                    <div className="col-sm-6 col-md-2 my-1">
                        <Link className="btn btn-outline-dark" to={{ pathname: `/students/scst` }} >
                            SC/ST Students
                        </Link>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1 ">
                        <Link to={{ pathname: `/students/rural` }} >
                            <button className="btn btn-outline-dark" type="button">Rural Students</button>
                        </Link>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1" >
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
                    </div>
                </div>
                <div className="row m-2 mb-5 justify-content-center tagBtn2">
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
                </div>
                <hr /> */}
                <StudList 
                    studs = {this.state.studs}
                    filteredValue = {this.state.search}
                />
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <div className="studList">
                    { html }
                </div>
            </React.Fragment>
        )
    }
}
export default Students;