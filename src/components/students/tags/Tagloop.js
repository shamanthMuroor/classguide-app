import React from 'react';
import TagDetails from './TagDetails';

class Tagloop extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.match.params.tag} students</h1>
        {this.props.location.state.studs.map(stud => (
          <TagDetails key={stud.id} tag={this.props.match.params.tag} stud={stud} /> 
      ))}
      </React.Fragment>
    )
  }
}

export default Tagloop;
