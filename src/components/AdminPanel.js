import React from 'react';
import { db, auth } from '../App';
import axios from 'axios';

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
                        _id: val.id, 
                        ...val.data()
                    })
                })
                axios.get("https://globaldb.sionasolutions.com/student-data")
                .then((res) => {
                    // console.log(res.data.data);
                    let arr = res.data.data;
                    arr = arr.map(val => {
                        return {
                            ...val,
                            _id: val.course + val.Batch
                        }
                    })  
                    arr = [...new Set(arr.map(item => item._id))];
                    // let val = staffarr.length === arr.length && arr.every(function(value, index) { return value === staffarr[index]._id});
                    // // console.log(val);
                    this.setState({studentClass: arr,staffDetails: staffarr})

                })
                .catch(err => {
                    console.log(err);
                }) 
            })
            .catch(err => console.log(err));
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

      handleSubmit = (e) => {
        let value = this.state.staffDetails;
        value = value.filter(val => {
            return val._id === this.state.staffValue;
        })
            console.log(this.state.classValue)
            e.preventDefault();

        db.collection('staffData').doc(this.state.staffValue).set({
            ...value[0],
            studentId: this.state.classValue
        }).then(() => alert("done"))
        .catch(err => console.log(err))
      }

  render() {
      let staffcol = this.state.staffDetails.map((val, i) => {
            return(
                <option key={i} value={val._id}>{val.name}</option>
            ) 
        })

        let classcol = this.state.studentClass.map((cval, i) => {
            return(
                <option key={i} value={cval._id}>{cval}</option>
            )
          })

return (
    <React.Fragment>
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
