import React from 'react';

class StudProfile extends React.Component {
    back = () => {
        this.props.hideStudProfile();
    }

    render() {
        let html = this.props.info.map(val => {
            // {console.log(val.name)}
            return (
                <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                    <div className="card-body">
                        <h3>Name: {val.name}</h3>
                        <h4>Reg. no: {val.reg}</h4>
                        <h4>Course: {val.id}</h4>
                    </div>
                </div>
            )
        })
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.back}>Back</button>
                </div>
                {html}
            </React.Fragment>
        )
    }
}
export default StudProfile;