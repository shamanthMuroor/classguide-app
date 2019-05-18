import React from 'react';
import '../styles/style.css';

class Meetings extends React.Component {
  state = {
    meeting : false,
    date : "12",
    agenda: 'july meeting',
    minutes: 'A meeting was conducted'
  }

  componentWillMount = () => {
    this.setState({meeting: true})
  }

  render() {
    let html = <div className="row">
      <div className="box" style={{marginTop: '100px', height: '250px', width: '250px', border: '1px dotted black', borderRadius: '20px'}}>
        <div> 
          <i className="fas fa-plus fa-10x"></i>
        </div>
      </div>
    </div>

    // html = if(this.state.meeting) {
    //   return ( <div>
    //     <table>
    //       <tr><th>Date</th><th>Agenda</th><th>Minutes</th></tr>              
    //       <tr><td>{this.state.date}</td><td>{this.state.agenda}</td><td>{this.state.agenda}</td></tr>
    //     </table>
    //   </div>)
    // }

    return (
      <div className="container">
        {html}
      </div>
    )
  }
}

export default Meetings;
