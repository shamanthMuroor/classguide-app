import React from 'react';
import AddRural from './AddRural';
import { db } from '../../../App'

class Rural extends React.Component {
    state = {
        showRuralForm: false,
        regno: '',
        student_name: '',
        marks: '',
        comment: '',
        motivation: '',
        students: [],
        error: '',
        showSuccess: false,
        submitting: false,
        loading: true
    }

    componentWillMount = () => {
        db.collection('general').doc('lectureid')
            .collection('rural').orderBy('regno').get()
            .then(val => {
                if(val.size > 0) {
                    val.forEach(values => {
                        let arr = []
                        arr.push({
                            id: values.id,
                            ...values.data()
                        })
                        this.setState({ students: this.state.students.concat(arr), loading: false })
                    })
                }
                else {
                    this.setState({loading: false})
                }
            })
            .catch(err => console.log(err))
    }

    // Handling form field changes
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // Adding Rural Students
    addRuralStudent = () => {
        const { regno, student_name, marks, comment, motivation } = this.state;
        if( regno === '' || student_name === '' || marks === '' || motivation === '')
            this.setState({error: 'Enter valid details'})
        else {
            this.setState({submitting: true})
            db.collection('general').doc('lectureid')
                .collection('rural').add({
                    regno: this.state.regno,
                    student_name: this.state.student_name,
                    marks: this.state.marks,
                    comment: this.state.comment,
                    motivation: this.state.motivation
                })
                .then((docRef) => {
                    const { id } = docRef;
                    console.log("adding id: " + id)
                    const student = { id, regno, student_name, marks, comment, motivation };
                    this.setState({
                        showRuralForm: false,        
                        students: this.state.students.concat(student),
                        regno: '',
                        student_name: '',
                        marks: '',
                        comment: '',
                        motivation: '',
                        error: '',
                        showSuccess: true,
                        submitting: false
                    })
                })
                .catch(err => console.log(err))
        }
    }

    // Deleting Rural Student data
    delRuralStudents = (id) => {
        // console.log("delete id: " + id)
        db.collection('general').doc('lectureid')
        .collection('rural').doc(id).delete()
          .then(() => {
            console.log(id + " del successful")
            alert("deleted successfully")
            this.setState({ students: [...this.state.students.filter(group => group.id !== id)] })
          })
          .catch(err => console.log(err))
    }


    // Showing Adding Rural Students Form
    showRuralForm = () => {
        this.setState({ showRuralForm: true })
    }

    // Closes the add form
    hideForm = () => {
        this.setState({ 
            showRuralForm: false,
            regno: '',
            student_name: '',
            marks: '',
            comment: '',
            student_guide: '',
            motivation: '',
            error: ''
        })
    }

    // Hides success message
    hideSuccess = () => {
        this.setState({ showSuccess: false })
    }

    render() {
        let loader = 
            <div className="text-center my-5">
                <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}} />
            </div>


        let successMsg=             
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Rural Student details added successfully
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.hideSuccess}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

        let html =       
            <div className="my-5">
                <h3>No data Found</h3>
                <small style={{color:'gray'}}>(Note: Maybe also due to network problem)</small>
            </div>

        if (this.state.students.length > 0) {
            html = this.state.students.map((data, i) => {
                return (
                    <div key={i} className="card mt-3 bg-light">
                        <div className="card-header d-flex justify-content-between">
                            <small style={{ color: 'gray' }}>{++i}</small>
                            <button
                                    type="button"
                                    className="text-danger"
                                    onClick={()=>this.delRuralStudents(data.id)} 
                                    style={{ background: 'transparent', border: 'none'}}
                                >
                                    <span className="mb-0" aria-hidden="true">
                                        <i className="far fa-trash-alt"></i>
                                    </span>
                            </button>
                        </div>
                        <div className="card-body d-flex">
                            <div className="row mx-0" style={{ width: '100%' }}>
                                <div className="col-md-2">
                                    <div>
                                        <i className="fas fa-user-circle fa-5x d-none d-md-block"></i>
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Student Learner</span>
                                        <div>{data.student_name}</div> 
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <hr className="d-md-none" />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>Register No: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.regno}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>Marks: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.marks}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>Comment: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.comment}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span style={{ fontWeight: 'bold', color: 'gray' }}>motivation: </span>
                                        </div>
                                        <div className="col-md-9">
                                            <span>{data.motivation}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="container">
                {
                    this.state.showRuralForm 
                    ? 
                    (
                        <AddRural 
                            handleChange={this.handleChange}
                            regno={this.state.regno}
                            student_name={this.state.student_name}
                            marks={this.state.marks}
                            comment={this.state.comment}
                            motivation={this.state.motivation}
                            hideForm={this.hideForm}
                            error={this.state.error} 
                            addRuralStudent={this.addRuralStudent}
                            submitting={this.state.submitting}
                        />
                    ) 
                    : 
                    (
                        <React.Fragment>
                            <div className="text-center" style={{marginTop: '100px'}}>
                                <h2>Rural Student List</h2>
                            </div>
                            <hr />
                            <div className="m-2">
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={this.showRuralForm}
                                    >
                                        + Add Rural Students
                                    </button>
                                </div>   
                            </div>
                            <hr />
                            {this.state.showSuccess && successMsg}
                            {this.state.loading ? loader : html}
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}

export default Rural;