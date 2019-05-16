import React from 'react';
import {db} from '../App';

class StudDetails extends React.Component {
    state = {
        values: [],
        obje: ""
    }

    componentWillMount = () => {
        db.collection("student").get()
            .then((val)=> {
                let arr = this.state.values;
                val.forEach(value => {
                    arr.push({
                        id: value.id,
                        ...value.data()
                    })
                    this.setState({values: arr})
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let html = <span>No records</span>
        if(this.state.values.length > 0 ) {
            html = this.state.values.map((val) => {
                return (    
                        <div>
                            <h5>{val.name}</h5>
                            <h6>{val.reg}</h6>
                        </div>
                )
            })  
        }

        return (
            <div>
                <h2>Student Details</h2>
                    Name Reg
                    {html}
                
            </div>
        )
    }
}
export default StudDetails;