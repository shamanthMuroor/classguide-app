import React from 'react';

class StudProfile extends React.Component {
    back = () => {
        this.props.hideStudProfile();
    }

    render() {
        let html = this.props.info.map(val => {
            // {console.log(val.name)}
            return (
                <React.Fragment>
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
                <div className="d-none d-md-flex mb-md-5">
                    <button onClick={this.back}>Back</button>
                </div>
                <div>
                    {html}
                </div>
            </div >
        )
    }
}
export default StudProfile;