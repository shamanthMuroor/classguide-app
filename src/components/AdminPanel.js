import React from 'react';
import Navbar from './general/Navbar';
// import Footer from './general/Footer';
import { db, auth } from '../App'

class AdminPanel extends React.Component {
    state = {
        staffDetails: [],
        studentClass: [],
        staffValue: '',
        classValue: ''
    }
    componentWillMount = () => {
        db.collection('staffData').get()
            .then((values) => {
                let staffarr = [];
                values.forEach(val => {
                    staffarr.push({
                        id: val.id,
                        ...val.data()
                    })
                })
            this.setState({staffDetails: staffarr})
            console.log("staff data done")
            })
            .catch(err => console.log(err))

        // let arr = [];
        // let newArr = [];
        // db.collection('students').get()
        //     .then((values)=> {
        //         values.forEach(val => {
        //             arr.push({...val.data(),_id: val._id})
        //         })
        //         newArr = arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
        //         this.setState({studentClass: newArr})
        //         console.log("class data done")
        //     })
        //     .catch(err => console.log(err))
    }  
    
    handleLogout = () => {
        auth.signOut()
          .then(function() {
          console.log("Sign-out successful")
          })
          .catch(err => console.log(err) );
      }
      

      handleChange = event => {
          this.setState({ [event.target.name]: event.target.value })
    }

      handleSubmit = () => {
          console.log(this.state.staffValue)
          console.log(this.state.classValue)
        // alert('staff: ' + this.state.staffValue + "class" + this.state.classValue);
        // event.preventDefault();

        // db.collection('staffData').doc().set({
        //     // student_id: this.state.classValue;
        // })
      }

  render() {
      let staffcol = this.state.staffDetails.map((val, i) => {
          return(
            <option key={i}>{val.name}</option>
          )
        })

        let classcol = this.state.studentClass.map((cval, i) => {
            return(
                <option key={i} value={cval.id}>{cval}</option>
            )
          })

          console.log(this.state)
return (
    <React.Fragment>
    <Navbar logout={this.handleLogout}/>            
    <div className="container shadow-lg p-3" style={{ marginTop: '120px' }}>
        <div className="card-body">
            <form>
                <label>
                    Pick  lec:
                    <select 
                        id="staffValue"
                        name="staffValue"
                        value={this.state.staffValue}
                        onChange={this.handleChange}
                    >

                        {staffcol}
                    </select>
                </label>
                <label>
                    Pick  class:
                    <select 
                        id="classValue"
                        name="classValue"
                        value={this.state.classValue}
                        onChange={this.handleChange}
                    >
                         {classcol}
                    </select>
                </label>
                <br />
                <button type="button" value="Submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        </div>
    </div></React.Fragment>  
    )
  }
}

export default AdminPanel;
