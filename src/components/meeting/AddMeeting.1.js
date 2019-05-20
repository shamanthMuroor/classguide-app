import React from 'react';
import PropTypes from 'prop-types';
import MasterForm from './meetingForm/MasterForm';

class AddMeeting extends React.Component{
    state = {
              showComponent: false,
    }

    _onButtonClick = () => {
        this.setState({
          showComponent: true       
        });
      }

    render() {
        return (
            <div>
                <button 
                    type="button" 
                    onClick={this._onButtonClick}
                    style={{height: '250px', width: '250px', border: '1px dotted black', borderRadius: '20px'}}
                >
                    <div> 
                        <i className="fas fa-plus fa-10x"></i>
                    </div>
                </button>
                {/* {!this.state.isHidden && <MasterForm addMeeting={this.addMeeting} /> } */}
                { this.state.showComponent ? <MasterForm addMeeting={this.props.addMeeting} />  : null  }
            </div>
        )
    }
}

//PropTypes
AddMeeting.propTypes = {
    addMeeting: PropTypes.func.isRequired
}

export default AddMeeting;