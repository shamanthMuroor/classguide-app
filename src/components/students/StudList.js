import React from 'react';
import StudItems from './StudItems';

class StudList extends React.Component {
  render() {
    let filteredList = this.props.studs.filter( (students) => {
      //  console.log(this.props.filteredValue)
         return (
           students.name.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1 
            || 
           students.regno.indexOf(this.props.filteredValue) !== -1 
            // || 
            // students.caste.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1
            // || 
            // students.location.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1
            
         )
      }
    );

    return filteredList.map((stud, i) => (
        <StudItems key={stud.regno} slno={++i} stud={stud} /> 
    ));
  }
}

export default StudList;
