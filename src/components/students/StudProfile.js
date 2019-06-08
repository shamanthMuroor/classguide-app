import React from 'react';

class StudProfile extends React.Component {
    render() {
        const { reg } = this.props;
        let html = this.props.studDetails.map((stud,i) => {
            if(stud.regno === reg) {
                return (
                    <React.Fragment key={i}>
                        <div className="text-right" style={{margin: "-2vw 5vw 10px 5vw"}}>
                            <button className="btn btn-secondary d-print-none" onClick={this.props.hideProfile}>Back</button>
                            <button className="btn btn-secondary print d-print-none ml-2" onClick={() => window.print()}>PRINT</button>
                        </div>
                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                            <div className="studentDP d-print-none">
                                <i className="fas fa-user-circle fa-5x"></i>
                            </div>
                            <div className="mt-3 card-body">
                                <h5 className="text-center mb-3">Personal Details</h5>
                                <h6>Name: {stud.name}</h6>
                                <h6>Reg. no: {stud.regno}</h6>
                                <h6>Course Name: {stud.course}</h6>
                                <h6>Batch: {stud.Batch}</h6>
                                <h6>Date of Birth: {stud.dob}</h6>
                                <h6>Gender: {stud.gender}</h6>
                            </div>
                        </div>
            
                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                            <div className="card-body">
                                <h5 className="text-center mb-3">Social Information</h5>
                                <h6>Religion: {stud.Religion}</h6>
                                <h6>Caste: {stud.Caste}</h6>
                                <h6>Caste Category: {stud.castecatagory}</h6>
                                <h6>Email: {stud.email}</h6>
                                <h6>Mobile: -</h6>
                                <h6>Aadhaar No: {stud.adhaarNo}</h6>
                                <h6>Address: {stud.address}</h6>
                            </div>	                        
                        </div>
            
                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                            <div className="card-body">
                                <h5 className="text-center mb-3">Family Background</h5>
                                <h6>Father'<s></s> Name: {stud.father}</h6>
                                <h6>Father's Number: {stud.fnumber}</h6>
                                <h6>Mother's Name: {stud.mother}</h6>
                                <h6>Mother's Number: {stud.mnumber}</h6>
                                <h6>Guardians's Name: -</h6>
                                <h6>Guardians's Number: -</h6>
                            </div>
                        </div>
                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf d-print-none">
                            <div className="card-body text-center" style={{padding: '2px'}}>
                                <button 
                                type="button" className="btn btn-info btn-circle btn-xl mr-2" data-toggle="tooltip" data-placement="top" title="Coming Soon" disabled>Attendance</button>
                                <button 
                                type="button" className="btn btn-warning btn-circle btn-xl mr-2" data-toggle="tooltip" data-placement="top" title="Coming Soon" disabled>Marks</button>
                                <button 
                                type="button" className="btn btn-success btn-circle btn-xl mr-2" data-toggle="tooltip" data-placement="top" title="Coming Soon" disabled>Progress</button>
                            </div>
                        </div>
                        <hr />
                    </React.Fragment>
                )
            }
        })

        return (
            <div style={{ marginTop: '110px' }}>
                {html}
            </div >
        )
    }
}
export default StudProfile;