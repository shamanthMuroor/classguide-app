import React from 'react';
import TagDetails from './TagDetails';

class Tagloop extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <h1>{this.props.match.params.tag} students</h1> */}
        <table className="mt-5">
          <tr><th>sl.no</th><th>Name</th></tr>
        {this.props.location.state.studs.map(stud => (
          <TagDetails key={stud.id} tag={this.props.match.params.tag} stud={stud} /> 
      ))}
      </table>
      </React.Fragment>
    )
  }
}

export default Tagloop;
