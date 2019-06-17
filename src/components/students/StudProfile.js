import React from 'react';
import { db } from '../../App'

class StudProfile extends React.Component {
    state = {
        studDetails: [],
        loading: true,
        isLoading: false,
        excellence: '',
        goal: '',
        observation: '',
        action: '',
        disabled: true
    }

    componentWillMount = () => {
        const {id}=this.props.match.params
        db.collection('students').doc(id).get()
            .then((val)=>{
                let arr=[]
                arr.push({
                    id: val.id,
                    ...val.data()
                })
                this.setState({studDetails: arr, loading: false})
            })
        db.collection('individualInfo').doc(id).get()
            .then((val)=>{
                this.setState({
                    excellence: val.data().excellence,
                    goal: val.data().goal,
                    observation: val.data().observation,
                    action: val.data().action                    
                })
            })
    }
 
    // Handling form field changes
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true })
        db.collection('individualInfo').doc(this.props.match.params.id).set({
            excellence: this.state.excellence,
            goal: this.state.goal,
            observation: this.state.observation,
            action: this.state.action
        })
            .then(() => {
                this.setState({
                    isLoading: false,
                    disabled: true
                })
            })
            .catch(err => console.log(err))
    }

    render() {   
        let loader = 
            <div className="text-center" style={{marginBottom: '250px', marginTop: '250px'}}>
                <div className="spinner-grow mr-1" role="status"> </div>
                <div className="spinner-grow mx-2" role="status"> </div>
                <div className="spinner-grow ml-1" role="status"> </div>
            </div>

        let html = this.state.studDetails.map((stud,i) => {
                return (
                    <React.Fragment key={i}>
                        <div className="text-right" style={{margin: "-2vw 5vw 10px 5vw"}}>
                            <button className="btn btn-secondary print d-print-none ml-2" onClick={() => window.print()}>PRINT</button>
                        </div>
                        <div className="d-none d-print-block m-5">
                            <h2 className="text-center">Student Profile</h2>
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
                                <h6>Father's Name: {stud.father}</h6>
                                <h6>Father's Number: {stud.fnumber}</h6>
                                <h6>Mother's Name: {stud.mother}</h6>
                                <h6>Mother's Number: {stud.mnumber}</h6>
                                <h6>Guardians's Name: -</h6>
                                <h6>Guardians's Number: -</h6>
                            </div>
                        </div>

                        <div className="container card shadow-lg p-3 mb-5 bg-white studProf">
                            <div className="card-body">
                                <div className="form-group">
                                    <h6>Areas of Excellence <br/>
                                        <small>(Specify: Fields of extracurricular activities, hobbies, Chief strengths)</small>
                                    </h6>
                                        <textarea
                                            className="form-control"
                                            id="excellence"
                                            name="excellence"
                                            rows="3"
                                            cols="30"
                                            placeholder="Enter area of Excellence"
                                            value={this.state.excellence}
                                            onChange={this.handleChange}
                                            disabled={this.state.disabled}
                                        />       
                                </div>
                                <div className="form-group">
                                    <h6>Goal to be achieved on completion of Bachelors course</h6>
                                    <input
                                        className="form-control"
                                        id="goal"
                                        name="goal"
                                        type="text"
                                        placeholder="Enter Goal"
                                        value={this.state.goal || ''}
                                        onChange={this.handleChange}
                                        disabled={this.state.disabled}
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Important observations : -</h6>
                                        <textarea
                                            className="form-control"
                                            id="observation"
                                            name="observation"
                                            rows="3"
                                            cols="30"
                                            placeholder="Enter important observations (To be filled by Class Guide)"
                                            value={this.state.observation}
                                            onChange={this.handleChange}
                                            disabled={this.state.disabled}
                                        />       
                                </div>
                                <div className="form-group">
                                    <h6>Action Plan</h6>
                                        <textarea
                                            className="form-control"
                                            id="action"
                                            name="action"
                                            rows="3"
                                            cols="30"
                                            placeholder="Enter action plan"
                                            value={this.state.action}
                                            onChange={this.handleChange}
                                            disabled={this.state.disabled}
                                        />       
                                </div>

                                <button 
                                    className="btn btn-success ml-2 my-2" 
                                    style={{ float: 'right' }} 
                                    disabled={this.state.disabled} 
                                    onClick={this.handleSubmit}
                                >
                                    {this.state.isLoading ? "Submitting..." : "Submit"}
                                </button>
                                <button 
                                    className="btn btn-secondary my-2" 
                                    style={{ float: 'right' }} 
                                    onClick={() => this.setState({ disabled: !this.state.disabled }) }
                                >
                                    {this.state.disabled ? "Edit" : "Close"}
                                </button>
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
        })
        return (
            <div style={{ marginTop: '110px' }}> 
                { 
                    this.state.loading 
                    ?
                    loader
                    :
                    html
                }
            </div >
        )
    }
}
export default StudProfile;