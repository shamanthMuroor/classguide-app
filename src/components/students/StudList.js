import React from 'react';
import StudItems from './StudItems';

class StudList extends React.Component {
  render() {
    return this.props.studs.map(stud => (
        <StudItems key={stud.id} stud={stud} /> 
    ));
  }
}

export default StudList;
