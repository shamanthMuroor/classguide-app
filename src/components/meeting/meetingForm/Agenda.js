import React from 'react';

class Agenda extends React.Component {
    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div className="form-group" style={{ height: '215px' }} >
            <label>Date</label>
            <div style={{ padding: '10px', paddingTop: '40px' }}>
              <input
                className="form-control"
                id="Date"
                name="date"
                type="date"
                placeholder="Enter Date"
                value={props.date}
                onChange={props.handleChange}
              />
            </div>
          </div>
        )
    }
}

export default Agenda;