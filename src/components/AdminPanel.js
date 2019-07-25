import React from 'react';
import { db } from '../App';
import axios from 'axios';
import AdminNavbar from './general/AdminNavbar';

class AdminPanel extends React.Component {
    state = {
        staffDetails: [],
        studentClass: [],
        staffValue: '',
        classValue: '',
        error: false,
        loading: true
    }
    componentWillMount = () => {
        db.collection('staffData').get()
            .then((values) => {
                let staffarr = [];
                values.forEach(val => {
                    staffarr.push({
                        _id: val.id,
                        ...val.data()
                    })
                })
                axios.get("https://globaldb.sionasolutions.com/student-data")
                    .then((res) => {
                        // console.log(res.data.data);
                        let arr = res.data.data;
                        arr = arr.map(val => {
                            return {
                                ...val,
                                _id: val.course + val.Batch
                            }
                        })
                        arr = [...new Set(arr.map(item => item._id))];
                        // let val = staffarr.length === arr.length && arr.every(function(value, index) { return value === staffarr[index]._id});
                        // // console.log(val);
                        this.setState({ studentClass: arr, staffDetails: staffarr, loading: false })

                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => console.log(err));
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (e) => {
        if (this.state.staffValue === '' || this.state.staffValue === 'Select Lecturer' || this.state.classValue === '' || this.state.classValue === 'Select Class') {
            this.setState({ error: true })
        }
        else {
            let value = this.state.staffDetails;
            value = value.filter(val => {
                return val._id === this.state.staffValue;
            })
            console.log(this.state.classValue)
            e.preventDefault();

            db.collection('staffData').doc(this.state.staffValue).set({
                ...value[0],
                studentId: this.state.classValue
            }).then(() => alert("done"))
                .catch(err => console.log(err))
        }
    }

    render() {
        let loader =
            <div className="text-center" style={{ marginBottom: '150px', marginTop: '230px' }}>
                <div className="spinner-grow mr-1" role="status"> </div>
                <div className="spinner-grow mx-2" role="status"> </div>
                <div className="spinner-grow ml-1" role="status"> </div>
            </div>

        let staffcol = this.state.staffDetails.map((val, i) => {
            return (
                <option key={i} value={val._id}>{val.name}</option>
            )
        })

        let classcol = this.state.studentClass.map((cval, i) => {
            return (
                <option key={i} value={cval._id}>{cval}</option>
            )
        })

        return (
            <React.Fragment>
                <AdminNavbar />
                {
                    this.state.loading
                        ?
                        loader
                        :
                        (
                            <div className="container shadow-lg p-3" style={{ marginTop: '70px' }}>
                                <div className="card-body" style={{ height: '350px' }}>
                                    <h1 className="text-center" style={{ padding: '10px', margin: '10px' }}>Admin Panel</h1>
                                    <hr />
                                    <form>
                                        {this.state.error && <div className="alert alert-danger m-1 p-0" role="alert">
                                            Choose valid option
                                    </div>}
                                        <div>
                                            <label>
                                                Pick  lecturer:
                                                <select
                                                    id="staffValue"
                                                    name="staffValue"
                                                    value={this.state.staffValue}
                                                    onChange={this.handleChange}
                                                >
                                                    <option>Select Lecturer</option>
                                                    {staffcol}
                                                </select>
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Pick  class:
                                                <select
                                                    id="classValue"
                                                    name="classValue"
                                                    value={this.state.classValue}
                                                    onChange={this.handleChange}
                                                    style={{ width: '75%' }}
                                                >
                                                    <option>Select Class</option>
                                                    {classcol}
                                                </select>
                                            </label>
                                        </div>
                                        <br />
                                        <button type="button" value="Submit" onClick={this.handleSubmit}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        )
                }
            </React.Fragment>
        )
    }
}

export default AdminPanel;
