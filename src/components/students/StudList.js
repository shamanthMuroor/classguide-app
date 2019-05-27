import React from 'react';
import StudItems from './StudItems';

class StudList extends React.Component {
  render() {
    let filteredList = this.props.studs.filter( (students) => {
         return (
           students.name.toLowerCase().indexOf(this.props.filteredValue.toLowerCase()) !== -1 || students.reg.indexOf(this.props.filteredValue) !== -1
         )
      }
    );

    return filteredList.map(stud => (
        <StudItems key={stud.id} stud={stud} /> 
    ));
  }
}

export default StudList;
