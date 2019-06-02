import React from 'react';
import {db} from '../App';
import StudList from './students/studentList/StudList';
import Search from './students/studentList/Search';
import Tags from './students/studentList/Tags';
import axios from 'axios';

class Students extends React.Component {
    state = { 
        studs : [],
        search: '',
        error: false,
        loading: true
    }

    componentWillMount = () => {
        let arr = [];
        let newArr = [];
        // axios.get("https://globaldb.sionasolutions.com")
        //     .then(value => {
        //         value.data.data.forEach((val, i) => {
        //             arr.push(val.course + val.Batch)
        //             this.setState({loading: true})
        //         })
                
        //         //Removing duplicate array
        //         newArr = arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });

                // B.Sc - Computer Sc. | Electronics | Mathematics SEMESTER V A
                // newArr[17] and newArr[12]
                db.collection("staff").where("student_id", "==", "B.Sc - Computer Sc. | Electronics | Mathematics SEMESTER V A").get()
                    .then(value => {
                        let val = ''
                        value.forEach(doc => {
                            val = doc.data().student_id;
                        })
                        console.log(val);
                        if(val==='')
                            this.props.history.push('./error');
                        else {
                            db.collection("students").where("_id", "==", val).orderBy("regno").get()
                                .then(querySnap => {
                                    querySnap.forEach(val => {
                                        let exarr = [];
                                        exarr.push({
                                            ...val.data()
                                        })
                                        this.setState({ studs: this.state.studs.concat(exarr), loading: false })
                                    })
                                })
                        }

                    })
            // })
            // .catch(err => {
            //     console.log(err)
            //     this.props.history.push('./error');
            // });
    }

    componentWillUnmount = () => {
        this.setState({
            studs: [], 
            search: '',
            loading: true
        })
    }

    updateSearch = (e) => {
        this.setState({search: e.target.value});
    }

    updateTag = (e) => {
        this.setState({search: e.target.name});
    }

    render() {      
    let loader = 
    <div className="text-center" style={{marginBottom: '150px', marginTop: '50px'}}>
        <div className="spinner-grow mr-1" role="status"> </div>
        <div className="spinner-grow mx-2" role="status"> </div>
        <div className="spinner-grow ml-1" role="status"> </div>
    </div>
        let html = (
            <React.Fragment>
                <StudList 
                    studs = {this.state.studs}
                    filteredValue = {this.state.search}
                />
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <div className="studList">
                    <h2 className="text-center">Student List</h2>
                    <div className="my-3">
                        <Search filterValue={this.updateSearch} search={this.state.search}/>
                        <div className="d-flex m-2 flex-row-reverse">
                            <button className="btn btn-small btn-secondary print" onClick={() => window.print()}>PRINT</button>
                    </div>
                    </div>
                    <hr />
                        <Tags search={this.updateTag}/>
                    <hr />
                    {this.state.loading ? loader : html }
                </div>
            </React.Fragment>
        )
    }
}
export default Students;