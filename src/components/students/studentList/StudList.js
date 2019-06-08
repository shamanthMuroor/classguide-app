import React from 'react';
import StudItems from './StudItems';

class StudList extends React.Component {
  render() {
    let filteredList = this.props.studs.filter( (students) => {
         return (
           students.name.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1 
           || 
           students.regno.toString().indexOf(this.props.filteredValue) !== -1 
            || 
            students.Caste.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1
            || 
            students.dob.toString().indexOf(this.props.filteredValue) !== -1 
             || 
            students.gender.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1
            
         )
      }
    );

    return filteredList.map((stud, i) => (
        <StudItems key={stud.regno} slno={++i} stud={stud}  setReg={this.props.setReg} /> 
    ));
  }
}

export default StudList;
