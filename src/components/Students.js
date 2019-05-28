import React from 'react';
import StudList from './students/StudList';
import {db} from '../App';
import Search from './Search';
import Tags from './Tags';
import axios from 'axios'

class Students extends React.Component {
    state = { 
        studs : [],
        search: ''
    }

    componentWillMount = () => {
        let arr = [];
        let newArr = [];
        axios.get("https://globaldb.sionasolutions.com")
            .then(value => {
                value.data.data.forEach((val, i) => {
                    arr.push(val.course + val.Batch)
                })
                
                //Removing duplicate array
                newArr = arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });

                db.collection("staff").where("student_id", "==", newArr[12]).get()
                    .then(value => {
                        let val = ''
                        value.forEach(doc => {
                            val = doc.data().student_id;
                        })
                        console.log(val);
                        db.collection("students").where("_id", "==", val).get()
                            .then(querySnap => {
                                querySnap.forEach(val => {
                                    let exarr = [];
                                    exarr.push({
                                        ...val.data()
                                    })
                                    this.setState({ studs: this.state.studs.concat(exarr) })
                                })
                            })
                    })
            })
            .catch(err => console.log(err));
    }

    componentWillUnmount = () => {
        this.setState({studs: []})
    }

    updateSearch = (e) => {
        this.setState({search: e.target.value});
    }

    updateTag = (e) => {
        this.setState({search: e.target.name});
    }

    render() {
        let html = (
            <React.Fragment>
                <h2 className="text-center">Student List</h2>
                <div className="my-2">
                   <Search filterValue={this.updateSearch} search={this.state.search}/>
                </div>
                <hr />
                    <Tags search={this.updateTag}/>
                <hr />
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