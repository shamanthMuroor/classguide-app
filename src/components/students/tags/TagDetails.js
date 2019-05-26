import React from 'react';
import {db} from '../../../App';

class TagDetails extends React.Component {       
    state = {
        students : []
    }

    componentWillMount = () => { 
        const { tag } = this.props.match.params;
        console.log('id:' + tag)
        db.collection('students').get()
            .then(res => { res.forEach(val => {
                let arr = [];
                arr.push({
                    id: val.id,
                    ...val.data() 
                })
                this.setState({students: this.state.students.concat(arr)})
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        let html = <h1>Hello</h1>
        console.log(this.state.students)
            // html = this.state.students.filter(stud => {
            //     if(tag)
                    // return <h1>{stud.tag}</h1>
            // })
        return (
            <React.Fragment>
                <div className="mt-5">
                    <h2>Tag Details</h2>
                        { html }
                </div>
            </React.Fragment>
        ) 
    }
}

export default TagDetails;
