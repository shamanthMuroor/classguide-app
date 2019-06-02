import React from 'react';

class Feedback extends React.Component {
  render() {  
    return ( 
      <div className="container card" style={{marginTop: '130px'}}>
        <div className="card-body">
            <h3 className="text-center"><i>Feedback</i></h3>
            <form>
                <div className="form-group" >
                    <label className="h5"></label>
                </div>
            </form>
        </div>
      </div>
    )
  }
}

export default Feedback;