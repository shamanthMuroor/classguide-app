import React from "react";
import { db } from '../../App';
import logo from '../../images/aloylogo.png';
import Modal from 'react-modal';
import { auth } from '../../App';
// import jwt_decode from 'jwt-decode';

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
        crOne: '',
        crTwo: '',
        error: false,
        crnames: false,
        modalIsOpen: false,
        report: false,
        user: {},
        generating: false,
        guideClass: '',
        meetings: [],
        parentmeetings: [],
        counselling: [],
        vesession: [],
        rural: [],
        slowLearner: [],
        acadGroups: [],
        levelGroups: [],
        nonAcadGroups: [],
        studentList: [],
        casteList: []
    };

    componentDidMount = () => {
        auth.onAuthStateChanged((usr) => {
            if (usr) {
                this.setState({ user: true })
            }
        })
        // if (localStorage.staffAuth) {
        //     let val = JSON.parse(localStorage.getItem("staffAuth"))
        //     this.setState({ user: jwt_decode(val.token) })

        //     // Student List
            db.collection("staffData").doc("5cef889e91c2fe210298755c").get()
        //     db.collection("staffData").doc(jwt_decode(val.token).id).get()
                        .then(res => {
                            if (res.data() != null) {
                                this.setState({ guideClass: res.data().studentId, user: res.data().name })
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

                            }
                        })
        // }
        // else
        //     this.props.history.push('/error')
    }

    openModal = () => {
        this.setState({ report: true, modalIsOpen: true, crnames: false });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, crnames: false, error: false });
    }

    // Handling form field changes
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    // Submitting cr names
    handleSubmit = e => {
        e.preventDefault()
        if (this.state.crOne === '')
            this.setState({ error: true, crnames: false })
        else
            this.setState({ crnames: true, error: false })
    }

    handleDownload = () => {
        this.setState({ generating: true })

        // Class Meeting
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
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
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
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
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
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

        // VE Session
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
            .collection('vesession').orderBy('regno').get()
            .then(val => {
                let arr = []
                val.forEach(values => {
                    arr.push({
                        id: values.id,
                        ...values.data()
                    })
                    this.setState({ vesession: this.state.vesession.concat(arr) })
                })
            })

        // Rural
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
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
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
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

        // Caste
        let list = []
        if (this.state.studentList.length > 0) {
            list = this.state.studentList.filter((value, i) => {
                if (value.Caste) {
                    if (value.Caste.toLowerCase() === 'sc' || value.Caste.toLowerCase() === 'st' || value.Caste.toLowerCase() === 'schedule caste' || value.Caste.toLowerCase() === 'schedule tribe' || value.Caste.toLowerCase() === 'scheduled caste' || value.Caste.toLowerCase() === 'scheduled tribe' || value.castecatagory.toLowerCase() === 'st' || value.castecatagory.toLowerCase() === 'sc') {
                        return value
                    }
                    else
                        return null
                }
                else
                    return null
            })
            this.setState({ casteList: list })
        }

        // Academic Achievers
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
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
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
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
        db.collection('general').doc('5cef889e91c2fe210298755c')
        // db.collection('general').doc(this.state.user.id)
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
            vesession: [],
            rural: [],
            slowLearner: [],
            acadGroups: [],
            levelGroups: [],
            nonAcadGroups: [],
            studentList: [],
            casteList: [],
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
                        <td>{value.regno}</td>
                        <td>{value.name}</td>
                        <td>{value.address}</td>
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
        let vesession =
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.vesession.length > 0) {
            vesession = this.state.vesession.map((value, i) => {
                return (
                    <tr key={i}>
                        <td>{++i}</td>
                        <td>{value.date}</td>
                        <td>{value.agenda}</td>
                        <td>{value.description}</td>
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
        // SC/ST
        let casteStudents =
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        if (this.state.casteList.length > 0) {
            casteStudents = this.state.casteList.map((value, i) => {
                return (
                    <tr key={i}>
                        <td>{++i}</td>
                        <td>{value.regno}</td>
                        <td>{value.name}</td>
                        <td>{value.marks}</td>
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
                {/* First Page for Report */}
                <div className="d-none d-print-block text-center" style={{ marginTop: "100px" }}>
                    <div>
                        <img src={logo} width="150px" height="150px" alt="College Logo" />
                        <h4>St. Aloysius College(Autonomous) Mangaluru</h4>
                        <h5 className="text-center">(Re-accredited by NAAC with 'A' Grade)</h5>
                    </div>
                    <div className="text-center" style={{ marginTop: "130px" }}>
                        <h1>Class Guide System</h1>
                        <h4>Activity Report ({this.getYear()}-{this.getYear() + 1})</h4>
                    </div>
                    <table className="table table-borderless" style={{ width: '80%', marginTop: "200px", border: 'none' }}>
                        <tbody>
                            <tr>
                                <th>Class: </th>
                                <td>{this.state.guideClass}</td>
                            </tr>
                            <tr>
                                <th>Class Guide: </th>
                                <td>{this.state.user.name}</td>
                            </tr>
                            <tr>
                                <th>Class Rep: </th>
                                <td>{this.state.crOne}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>{this.state.crTwo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="d-none d-print-block" style={{ padding: '40px', pageBreakBefore: 'always' }}>
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
                                <th>Reg No.</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Mobile No.</th>
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
                                <th>Meeting Date</th>
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
                                <th>Reg No.</th>
                                <th>Meeting Date</th>
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

                    <h4 className="text-center" style={{ marginTop: '100px' }}>Value Education Sessions</h4>
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
                            {this.state.report && vesession}
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

                    <h4 className="text-center" style={{ marginTop: '100px' }}>List of SC/ST Students</h4>
                    <table className="mt-4 p-2" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Sl.no</th>
                                <th>Reg No</th>
                                <th>Name</th>
                                <th>Marks(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.report && casteStudents}
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
                {/* End of Report */}

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

                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Confirm Modal"
                    >
                        <div className="d-flex justify-content-between">
                            {!this.state.crnames ? <h5>Add Class Rep Names</h5> : <h5>Confirm To Generate Reports</h5>}
                            <button onClick={this.closeModal} style={{ background: 'none', border: 'none' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>&times;</span>
                            </button>
                        </div>
                        <hr />
                        {
                            !this.state.crnames
                                ?
                                (
                                    <React.Fragment>
                                        <div className="form-group">
                                            <form>
                                                <label>* Class Representative Name: </label>
                                                <input
                                                    className="form-control"
                                                    name="crOne"
                                                    type="text"
                                                    placeholder="Enter Class Rep name"
                                                    value={this.crOne}
                                                    onChange={this.handleChange}
                                                />
                                                <br />
                                                <label>Second Class Representative Name:</label>
                                                <input
                                                    className="form-control"
                                                    name="crTwo"
                                                    type="text"
                                                    placeholder="Enter 2nd Class Rep name"
                                                    value={this.crTwo}
                                                    onChange={this.handleChange}
                                                />
                                                <hr />
                                                {this.state.error && <div className="alert alert-danger m-1 p-0" role="alert">
                                                    Enter valid details
                                            </div>}
                                                <button className="btn btn-success" style={{ float: 'right' }} onClick={this.handleSubmit}>
                                                    Submit
                                            </button>
                                            </form>
                                        </div>
                                    </React.Fragment>
                                )
                                :
                                (
                                    <React.Fragment>
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
                                    </React.Fragment>
                                )
                        }
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Reports;
