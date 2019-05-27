import React from 'react';
import StudList from './students/StudList';
import {db} from '../App';
import {Link} from 'react-router-dom';

class Students extends React.Component {
    state = { 
        studs : []
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

    render() {
        let html = (
            <React.Fragment>
                <h2 className="text-center">Student List</h2>
                <div className="my-2">
                    <form className="form-inline d-flex justify-content-center">
                        <input className="form-control mt-2 mr-md-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark mt-2" type="submit">Search</button>
                    </form>
                </div>
                <hr />
                <div className="row m-2 justify-content-center tagBtn1">
                    <div className="col-sm-6 col-md-2 my-1">
                        <Link to={{ pathname: `/students/scst`, state: { studs: this.state.studs }  }} >      
                            <button className="btn btn-outline-dark" type="button">SC/ST Students</button>
                        </Link>
                    </div>
                    <div className="col-sm-6 col-md-2 my-1 ">
                        <Link to={{ pathname: `/students/rural`, state: { studs: this.state.studs } }} >
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
                        <button className="btn btn-outline-dark" type="button">Students Not Completed Sahaaya Programme</button>
                    </div>
                </div>
                <hr />
                <StudList 
                    studs = {this.state.studs}
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