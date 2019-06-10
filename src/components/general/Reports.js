import React from "react";
import { db } from '../../App';
import logo from '../../images/aloylogo.png';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

class Reports extends React.Component {
    state = {
        modalIsOpen: false,
        report: false,
        user: {},
        generating: false,
        guideClass: '',
        meetings: [],
        parentmeetings: [],
        counselling: [],
        rural: [],
        slowLearner: [],
        acadGroups: [],
        levelGroups: [],
        nonAcadGroups: [],
        studentList: []
    };

    componentWillMount = () => {
        let val = JSON.parse(localStorage.getItem("staffAuth"))
        this.setState({ user: jwt_decode(val.token) })

        
        // Student List
        db.collection("staffData").doc(jwt_decode(val.token).id).get()
            .then(res => {
                this.setState({ guideClass: res.data().studentId })
                db.collection("students").where("_id", "==", res.data().studentId).get()
                    .then((response) => {
                        let arr = [];
                        response.forEach(val => {
                            arr.push({
                                id: val.id,
                                ...val.data()
                            })
                        })
                        this.setState({ studentList: this.state.studentList.concat(arr) })
                    })
            })
    }

    openModal = () => {
        this.setState({ report: true, modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleDownload = () => {
        this.setState({ generating: true })


        // Class Meeting
        db.collection('general').doc(this.state.user.id)
            .collection('classMeetings').orderBy("date").get()
            .then(res => {
                let arr = [];
                res.forEach(val => {
                    arr.push({
                        id: val.id,
                        ...val.data()
                    })
                    this.setState({ meetings: this.state.meetings.concat(arr) })
                })
            })

        // Parent Meeting
        db.collection('general').doc(this.state.user.id)
            .collection('parentMeetings').orderBy("date").get()
            .then(res => {
                let arr = [];
                res.forEach(val => {
                    arr.push({
                        id: val.id,
                        ...val.data()
                    })
                    this.setState({ parentmeetings: this.state.parentmeetings.concat(arr) })
                })
            })

        // Counselling
        db.collection('general').doc(this.state.user.id)
            .collection('counselling').orderBy('regno').get()
            .then(val => {
                let arr = []
                val.forEach(values => {
                    arr.push({
                        id: values.id,
                        ...values.data()
                    })
                    this.setState({ counselling: this.state.counselling.concat(arr) })
                })
            })

        // Rural
        db.collection('general').doc(this.state.user.id)
            .collection('rural').orderBy('regno').get()
            .then(val => {
                let arr = []
                val.forEach(values => {
                    arr.push({
                        id: values.id,
                        ...values.data()
                    })
                    this.setState({ rural: this.state.rural.concat(arr) })
                })
            })

        // Slow Learner
        db.collection('general').doc(this.state.user.id)
            .collection('slowLearner').orderBy('regno').get()
            .then(val => {
                let arr = []
                val.forEach(values => {
                    arr.push({
                        id: values.id,
                        ...values.data()
                    })
                    this.setState({ slowLearner: this.state.slowLearner.concat(arr) })
                })
            })

        // Academic Achievers
        db.collection('general').doc(this.state.user.id)
            .collection('academic').orderBy('regno').get()
            .then(val => {
                let arr = []
                val.forEach(values => {
                    arr.push({
                        id: values.id,
                        ...values.data()
                    })
                    this.setState({ acadGroups: this.state.acadGroups.concat(arr) })
                })
            })

        // Achievers at Different Levels
        db.collection('general').doc(this.state.user.id)
            .collection('level').orderBy('regno').get()
            .then(val => {
                let arr = []
                val.forEach(values => {
                    arr.push({
                        id: values.id,
                        ...values.data()
                    })
                    this.setState({ levelGroups: this.state.levelGroups.concat(arr) })
                })
            })

        // Non Academic Achievers
        db.collection('general').doc(this.state.user.id)
            .collection('nonacademic').orderBy('regno').get()
            .then(val => {
                val.forEach(values => {
                    let arr = []
                    arr.push({
                        id: values.id,
                        ...values.data()
                    })
                    this.setState({ nonAcadGroups: this.state.nonAcadGroups.concat(arr) })
                })
                this.closeModal()
                window.print()
                this.changeState()
            })

    }

    changeState = () => {
        this.setState({
            meetings: [],
            parentmeetings: [],
            counselling: [],
            rural: [],
            slowLearner: [],
            acadGroups: [],
            levelGroups: [],
            nonAcadGroups: [],
            studentList: [],
            generating: false
        })
    }

    getYear() {
        return new Date().getFullYear();
    }

    render() {
        let students = 
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.studentList.length > 0) {
            students = this.state.studentList.map((value, i) => {
                    return (
                        <tr key={i}>
                            <td>{++i}</td>
                            <td>{value.name}</td>
                            <td>{value.address}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>{value.father}</td>
                            <td>-</td>
                            <td>{value.fnumber}</td>
                        </tr>
                    )
            })
        }
        let classmeetings = 
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.meetings.length > 0) {
            classmeetings = this.state.meetings.map((value, i) => {
                    let date = value.date.split("-").reverse().join("-");
                    return (
                        <tr key={i}>
                            <td>{++i}</td>
                            <td>{date}</td>
                            <td>{value.agenda}</td>
                            <td>{value.description}</td>
                        </tr>
                    )
                })
        }
        let parentmeetings = 
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.parentmeetings.length > 0) {
            parentmeetings = this.state.parentmeetings.map((value, i) => {
                    let date = value.date.split("-").reverse().join("-");
                    return (
                        <tr key={i}>
                            <td>{++i}</td>
                            <td>{value.reg}</td>
                            <td>{date}</td>
                            <td>{value.agenda}</td>
                            <td>{value.attended}</td>
                            <td>{value.description}</td>
                        </tr>
                    )
                })
        }
        let counselling = 
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.counselling.length > 0) {
            counselling = this.state.counselling.map((value, i) => {
                    return (
                        <tr key={i}>
                            <td>{++i}</td>
                            <td>{value.regno}</td>
                            <td>{value.name}</td>
                            <td>{value.marks}</td>
                            <td>{value.reason}</td>
                            <td>{value.measures}</td>
                            <td>{value.output}</td>
                        </tr>
                    )
                })
        }
        let rural = 
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.rural.length > 0) {
            rural = this.state.rural.map((value, i) => {
                return (
                    <tr key={i}>
                        <td>{++i}</td>
                        <td>{value.regno}</td>
                        <td>{value.student_name}</td>
                        <td>{value.marks}</td>
                        <td>{value.comment}</td>
                        <td>{value.motivation}</td>
                    </tr>
                )
            })
        }
        let slowLearner =
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.slowLearner.length > 0) {
            slowLearner = this.state.slowLearner.map((value, i) => {
                return (
                    <tr key={i}>
                        <td>{++i}</td>
                        <td>{value.regno}</td>
                        <td>{value.student_learner}</td>
                        <td>{value.marks}</td>
                        <td>{value.comment}</td>
                        <td>{value.measures}</td>
                        <td>{value.student_guide}</td>
                    </tr>
                )
            })
        }
        let acadGroups =
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.acadGroups.length > 0) {
            acadGroups = this.state.acadGroups.map((value, i) => {
                return (
                    <tr key={i}>
                        <td>{++i}</td>
                        <td>{value.regno}</td>
                        <td>{value.name}</td>
                        <td>{value.marks}</td>
                        <td>{value.motivation}</td>
                    </tr>
                )
            })
        }
        let levelGroups =
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.levelGroups.length > 0) {
            levelGroups = this.state.levelGroups.map((value, i) => {
                return (
                    <tr key={i}>
                        <td>{++i}</td>
                        <td>{value.regno}</td>
                        <td>{value.name}</td>
                        <td>{value.excellence}</td>
                        <td>{value.prizes}</td>
                    </tr>
                )
            })
        }
        let nonAcadGroups =
                <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            if (this.state.nonAcadGroups.length > 0) {
                nonAcadGroups = this.state.nonAcadGroups.map((value, i) => {
                    return (
                        <tr>
                            <td>{++i}</td>
                            <td>{value.regno}</td>
                            <td>{value.name}</td>
                            <td>{value.excellence}</td>
                            <td>{value.prizes}</td>
                        </tr>
                    )
                })
            }

        return (
            <div className="container">
                <div className="card d-print-none" style={{ margin: "130px 10px 130px 10px", padding: '50px' }}>
                    <div className="card-header">
                        <h3 className="text-center">Generating Report</h3>
                    </div>
                    <div className="card-body text-center">
                        <button type="button" className="btn btn-primary mb-2" onClick={this.openModal}>
                            Generate Report
                        </button>
                    </div>
                </div>

                {/* First Page for Report */}
                <div className="d-none d-print-block text-center" style={{ marginTop: "100px" }}>
                    <div>
                        <img src={logo} width="100px" height="100px" alt="College Logo" />
                        <h5>St. Aloysius College(Autonomous) Mangaluru</h5>
                        <h6 className="text-center">(Re-accredited by NAAC with 'A' Grade)</h6>
                    </div>
                    <div className="text-center" style={{ marginTop: "130px" }}>
                        <h2>Class Guide System</h2>
                        <h4>Activity Report ({this.getYear()}-{this.getYear() + 1})</h4>
                    </div>
                    <div className="">
                        <div className="d-flex" style={{ marginTop: "130px" }}>
                            <div className="mr-3 p-4">
                                <h5>Class: </h5>
                            </div>
                            <div className="p-4">
                                <h5>{this.state.guideClass}</h5>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3 p-4">
                                <h5>Class Guide: </h5>
                            </div>
                            <div className="p-4">
                                <h5>{this.state.user.name}</h5>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="mr-3 p-4">
                                <h5>Class Rep: </h5>
                            </div>
                            <div className="p-4">
                                <h5>-</h5>
                                <h5>-</h5>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="d-none d-print-block" style={{ marginTop: "150px", padding: '40px' }}>
                    <div className="my-5">
                        <h5>I. Class Guide System</h5>
                        <ul type="square">
                            <li>The main objective of this system is to transform the class into team / WE- FORCE.</li>
                            <li>To develop a sense of identity, we feeling, and confidence among students.</li>
                            <li>To recognise the special gifts and talents of every student so as to promote their growth and development towards higher level of competency, creativity and fulfilment.</li>
                            <li>To establish adult to adult relationship between the staff and the students and to create a favourable environment in the campus to achieve authentic education.</li>
                            <p>Eg: The role of class guide/Mentor is best illustrated in case of Helen Keller. As a young child she was not only deaf and blind but nearly demented in her behaviour. It was because of the dedication, insight and hard work of her teacher Anne Sullivan Helen was able to realise her intellectual and artistic gifts.</p>
                        </ul>
                    </div>

                    <div className="my-5">
                        <h5>II. An effective Class Guide</h5>
                        <ul type="square">
                            <li>Transforms the class into a team by planning innovative activities and executing them through regular meetings. </li>
                            <li>Knows every student by name and is familiar with each student’s background, aptitude, capacity and talent. </li>
                            <li>Monitors attendance, progress and behavior in the campus </li>
                            <li>Helps the students to know their strength and weakness. </li>
                            <li>Helps the student to keep a goal in life and encourage them to achieve it. </li>
                            <li>Gives special attention to slow learners, high achievers, deviant and economically poor students. </li>
                            <li>Recommends names to prizes, awards, scholarships, midday meals etc. </li>
                            <li>Provides academic, career and personal guidance. </li>
                            <li>Occasionally visits their houses especially when there is a tragedy at home. </li>
                        </ul>
                    </div>

                    <div className="my-5">
                        <h5>III. Activities which could be taken up</h5>
                        <ul type="square">
                            <li>Identify the slow learners and request the bright students to help them out on regular basis. A contract has to be worked out between the two.</li>
                            <li>Class as a whole is made responsible for the class discipline, participation in college activities like fests, sports, retreats, etc</li>
                            <li>Class can plan some awareness programmes with respect to environment, social and cultural issues, etc.</li>
                        </ul>
                    </div>
                </div>

                <div className="d-none d-print-block" style={{ marginTop: '150px' }}>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>Student List</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Mobile No.</th>
                                <th>Residential Address</th>
                                <th>Parent Name</th>
                                <th>Parent Occupation</th>
                                <th>Parent Phone No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && students}
                        </tbody>
                    </table>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>Class Meetings</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Date</th>
                                <th>Agenda</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && classmeetings}
                        </tbody>
                    </table>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>List of students called for Parent-Teacher Meeting</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Reg No</th>
                                <th>Date</th>
                                <th>Agenda</th>
                                <th>Attended</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && parentmeetings}
                        </tbody>
                    </table>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>List of students with special attention / Counselling</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Reg No</th>
                                <th>Name</th>
                                <th>Marks</th>
                                <th>Reason</th>
                                <th>Measures</th>
                                <th>Output</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && counselling}
                        </tbody>
                    </table>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>List of Rural students</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Reg No</th>
                                <th>Name</th>
                                <th>Marks</th>
                                <th>Comment</th>
                                <th>Motivation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && rural}
                        </tbody>
                    </table>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>List of Slow Learners</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Reg No</th>
                                <th>Student Learner</th>
                                <th>Marks</th>
                                <th>Comment</th>
                                <th>Measures</th>
                                <th>Student Guide</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && slowLearner}
                        </tbody>
                    </table>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>List of Academic Achievers</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Reg No</th>
                                <th>Student Name</th>
                                <th>Marks</th>
                                <th>Motivation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && acadGroups}
                        </tbody>
                    </table>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>List of Achievers at University / State / National Level</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Reg No</th>
                                <th>Student Name</th>
                                <th>Area of Excellence</th>
                                <th>Participation/ Prizes won</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && levelGroups}
                        </tbody>
                    </table>

                    <h4 className="text-center" style={{ marginTop: '100px' }}>List of Non-Achievers Achievers</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Reg No</th>
                                <th>Student Name</th>
                                <th>Area of Excellence</th>
                                <th>Participation/ Prizes won</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && nonAcadGroups}
                        </tbody>
                    </table>
                </div>

                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Confirm Modal"
                    >
                        <div className="d-flex justify-content-between">
                            <h5>Confirm To Generate Reports</h5>
                            <button onClick={this.closeModal} style={{ background: 'none', border: 'none' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>&times;</span>
                            </button>
                        </div>
                        <hr />
                        <div>
                            <div className="alert alert-warning" role="alert">
                                <i className="fas fa-exclamation-circle"></i><span> Warning: This action will cost high amount of internet data!</span>
                            </div>
                            Are you sure, you want to generate the report?
                        </div>
                        <hr />
                        <div className="text-right">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDownload}
                                disabled={this.state.generating}
                            >
                                {this.state.generating ? "Generating..." : "Generate"}
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Reports;
