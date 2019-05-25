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
            <StudList 
                studs = {this.state.studs}
                viewStudDetails = {this.viewStudDetails}
                view={this.view} 
            />)
        return (
            <div className="studList">
                {this.state.show ? <StudProfile info={this.state.info} hideStudProfile={this.hideStudProfile} /> : html } 
            </div>
        )
    }
}
export default Students;