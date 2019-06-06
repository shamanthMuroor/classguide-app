import React from 'react';

class Modals extends React.Component {
    // modelToggle = () => {
    //     console.log("i was here")
    //     // document.getElementById('exampleModal').className="modal fade show";
    // }

    render() {
        const { id } = this.props;
        console.log(id)
        return (
            <React.Fragment>
                <div className="modal fade show" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-danger" role="alert">
                                    <i className="fas fa-exclamation-circle"></i><span> Warning: This action cannot be undone!</span>
                                </div>
                                Are you sure, you want to delete this meeting permanently?
                                </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={()=> this.props.delMeeting(id)}
                                    data-dismiss="modal"
                                >
                                    Delete
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )}
}
export default Modals;