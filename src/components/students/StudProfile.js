import React from 'react';
import {db} from '../../App';

class StudProfile extends React.Component {
    state = {
        info : []
    }

    componentDidMount () {
        const { StudID } = this.props.location.state;
        console.log('id:' + StudID)
        db.collection('students').doc(StudID).get()
            .then(data => {
                let details = [];
                details.push({
                    id: data.id,
                    ...data.data()
                })
                this.setState({ info: details })
            })
            .catch(err => console.log(err))
    }

 
    render() {
        let html = this.state.info.map((val) => {
            return (
                <React.Fragment key={val.id}>
                    <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                        <div className="studentDP">
                            <i className="fas fa-user-circle fa-6x"></i>
                        </div>
                        <div className="card-body">
                            <h4>Name: {val.name}</h4>
                            <h5>Reg. no: {val.reg}</h5>
                            <h5>Course: {val.id}</h5>
                        </div>
                    </div>
                </React.Fragment>
            )
        })
        return (
            <div style={{marginTop: '110px'}}>
                <div>
                    {html}
                </div>
            </div >
        )
    }
}
export default StudProfile;