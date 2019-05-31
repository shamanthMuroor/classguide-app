import React from 'react';

class StudProfile extends React.Component {
    render() {
        const { studDetails } = this.props.location.state;
        return (
            <div style={{ marginTop: '110px' }}>
                <div>
                    {/* {console.log(studDetails.name)} */}
                    <React.Fragment>
                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                            <div className="studentDP">
                                <i className="fas fa-user-circle fa-5x"></i>
                            </div>
                            <div className="mt-3 card-body">
                                <h5 className="text-center mb-3">Personal Details</h5>
                                <div className="text-right">
                                    <button className="btn btn-secondary print" onClick={() => window.print()}>PRINT</button>
                                </div>
                                <h6>Name: {studDetails.name}</h6>
                                <h6>Reg. no: {studDetails.regno}</h6>
                                <h6>Course Name: {studDetails.course}</h6>
                                <h6>Batch: {studDetails.Batch}</h6>
                                <h6>Date of Birth: {studDetails.dob}</h6>
                                <h6>Gender: {studDetails.gender}</h6>
                            </div>
                        </div>

                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                            <div className="card-body">
                                <h5 className="text-center mb-3">Social Information</h5>
                                <h6>Religion: {studDetails.Religion}</h6>
                                <h6>Caste: {studDetails.Caste}</h6>
                                <h6>Caste Category: {studDetails.castecatagory}</h6>
                                <h6>Email: {studDetails.email}</h6>
                                <h6>Mobile: -</h6>
                                <h6>Aadhaar No: {studDetails.adhaarNo}</h6>
                                <h6>Address: {studDetails.address}</h6>
                            </div>	                        
                        </div>

                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                            <div className="card-body">
                                <h5 className="text-center mb-3">Family Background</h5>
                                <h6>Father'<s></s> Name: {studDetails.father}</h6>
                                <h6>Father's Number: {studDetails.fnumber}</h6>
                                <h6>Mother's Name: {studDetails.mother}</h6>
                                <h6>Mother's Number: {studDetails.mnumber}</h6>
                                <h6>Guardians's Name: -</h6>
                                <h6>Guardians's Number: -</h6>
                            </div>
                        </div>
                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf a">
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
                </div>
            </div >
        )
    }
}
export default StudProfile;