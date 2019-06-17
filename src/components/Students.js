import React from 'react';
import {db} from '../App';
import StudList from './students/studentList/StudList';
import Search from './students/studentList/Search';
import Tags from './students/studentList/Tags';
import jwt_decode from 'jwt-decode';

class Students extends React.Component {
    state = { 
        studs : [],
        search: '',
        error: false,
        loading: true,
        tag: false
    }

    componentWillMount = () => {
        if(localStorage.staffAuth) {
            let user = JSON.parse(localStorage.getItem("staffAuth"));
            let value = jwt_decode(user.token);
            // console.log(value);
            // debugger;
            db.collection("staffData").doc(value.id).get()
            .then(res => {
                db.collection("students").where("_id","==",res.data().studentId)
                    .orderBy("regno").get()
                    .then((response) => {
                        let arr = [];
                        response.forEach(val => {
                            arr.push({
                                id: val.id,
                                ...val.data()
                            })
                        })
                        // console.log(arr);
                        this.setState({studs: arr, loading: false})
                    })
            })
            .catch(err => {
                this.setState({loading: false})
            })
        }
    }


    updateSearch = (e) => {
        this.setState({search: e.target.value, tag: false});
    }

    updateTag = (e) => {
        this.setState({search: e.target.name, tag: true});
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
                    tag={this.state.tag}
                />
            </React.Fragment>
        )
        return (
            <React.Fragment>
                { 
                        <div className="studList">
                            <h2 className="text-center">Student List</h2>
                            <div className="my-3">
                                <Search filterValue={this.updateSearch} search={this.state.search}/>
                                <div className="d-flex m-2 flex-row-reverse d-print-none">
                                    <button 
                                        className="btn btn-small btn-secondary print" 
                                        onClick={() => window.print()}
                                    >
                                        PRINT
                                    </button>
                                </div>
                            </div>
                            <hr className="d-print-none" />
                                <Tags search={this.updateTag}/>
                            <hr />
                            {this.state.loading ? loader : html }
                        </div>
                    
                }
            </React.Fragment>
        )
    }
}
export default Students;