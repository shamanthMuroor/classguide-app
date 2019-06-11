import React from 'react';
import {db} from '../App';
import StudList from './students/studentList/StudList';
import Search from './students/studentList/Search';
import Tags from './students/studentList/Tags';
import StudProfile from './students/StudProfile';
import jwt_decode from 'jwt-decode';

class Students extends React.Component {
    state = { 
        studs : [],
        search: '',
        error: false,
        loading: true,
        profile: false,
        reg: ''
    }

    componentWillMount = () => {
        if(localStorage.staffAuth) {
            let user = JSON.parse(localStorage.getItem("staffAuth"));
            let value = jwt_decode(user.token);
            // console.log(value);
            // debugger;
            db.collection("staffData").doc(value.id).get()
            .then(res => {
                db.collection("students").where("_id","==",res.data().studentId).get()
                    .then((response) => {
                        let arr = [];
                        response.forEach(val => {
                            arr.push({
                                ...val.data()
                            })
                        })
                        // console.log(arr);
                        this.setState({studs: arr, loading: false})
                    })
            })
            .catch(err => {
                this.setState({loading: false})
                this.props.history.push('/error')
            })
        }
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

    hideProfile = () => {
        this.setState({profile: false, reg: ''})
    }

    setReg = (reg) => {
        this.setState({profile: true, reg: reg})
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
                    setReg={this.setReg}
                />
            </React.Fragment>
        )
        return (
            <React.Fragment>
                { 
                    this.state.profile 
                    ? 
                        <StudProfile studDetails={this.state.studs} reg={this.state.reg} hideProfile={this.hideProfile} /> 
                    : 
                    (
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
                    ) 
                }
            </React.Fragment>
        )
    }
}
export default Students;