import React from 'react';
import StudList from './students/StudList';
import StudProfile from './students/StudProfile';
import {db} from '../App';

class Students extends React.Component {
    state = {
        show: false,        
        info: [],
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

    viewStudDetails = () => {
        return (console.log("hello"))
    }
    

    // Viewing Student Profile
    view = (ids) => {
        console.log('id:' + ids)
        db.collection('students').doc(ids).get()
        .then(data => {
            let details = [];
            details.push({
                id: data.id,
                ...data.data() 
            })
            this.setState({info: details, show: true})
            // console.log(this.state.info)
        })
    .catch(err => console.log(err))
    }

    // Function to hide Student Profile
    hideStudProfile = () => {
        this.setState({show: false})
    }

    render() {
        // console.log(this.state.studs)
        let html = (
            <React.Fragment>
                <h2 className="text-center">Student List</h2>
                <div className="my-4">
                    <form className="form-inline d-flex justify-content-center">
                        <input className="form-control mt-2 mb-md-4 mr-md-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark mt-2 mb-4" type="submit">Search</button>
                    </form>
                </div>
                <StudList 
                    studs = {this.state.studs}
                    viewStudDetails = {this.viewStudDetails}
                    view={this.view} 
                />
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <div className="studList">
                    {this.state.show ? <StudProfile info={this.state.info} hideStudProfile={this.hideStudProfile} /> : html } 
                </div>
            </React.Fragment>
        )
    }
}
export default Students;