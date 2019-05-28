import React from 'react';
import StudList from './students/StudList';
import {db} from '../App';
import Search from './Search';
import Tags from './Tags';

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