import React from 'react';
import Modals from './Modals'
import '../../styles/style.css'

class ParentMeetingItem extends React.Component {
    state = {
        delId: '',
        showModal: false
    }

    renderModal = () => {
        return (
            <div className="modal fade show" id="exampleModal" tabIndex="-1" role="dialog">
                {console.log("modal render clicked, id: " + this.props.parentmeeting.id)}
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
                                onClick={() => this.props.delMeeting.bind(this, this.props.parentmeeting.id)}
                                data-dismiss="modal"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let { id, reg, date, agenda, attended, description } = this.props.parentmeeting;        
        date = date.split("-").reverse().join("-");
        return (
            <React.Fragment>
                {this.state.showModal && this.renderModal() }
                <div className="mt-4 container headMeetingItems">
                    <div className="row pt-2">
                        <div className="col pr-2">
                            <button
                                type="button"
                                className="text-danger"
                                // data-toggle="tooltip" 
                                // data-placement="bottom" 
                                // title="Delete this meeting"
                                // onClick={this.props.delMeeting.bind(this, id)} 
                                onClick={() => this.setState({showModal: true})}
                                style={{ background: 'transparent', border: 'none', float: 'right' }}
                            >
                                <span className="mb-0" aria-hidden="true">
                                    <i className="far fa-trash-alt"></i>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="text-secondary mr-2"
                                onClick={this.props.editMeeting.bind(this, id)} 
                                style={{ background: 'transparent', border: 'none', float: 'right'}}
                            >
                                <span className="mb-0" aria-hidden="true">
                                    <i className="far fa-edit"></i>
                                </span>
                            </button>
                        
                        </div>
                    </div>

                    <div className="text-left p-3">
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Register No: </span>
                            </div>
                            <div className="col-md-10">
                                <span>{reg}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Date: </span>
                            </div>
                            <div className="col-md-10">
                                <span>{date}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Parent/Guardian Name: </span>
                            </div>
                            <div className="col-md-10">
                                <span>{attended}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Agenda: </span>
                            </div>
                            <div className="col-md-10">
                                <span>{agenda}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">
                                <span style={{ fontWeight: 'bold', color: 'gray' }}>Description: </span>
                            </div>
                            <div className="col-md-10">
                                <pre style={{
                                    marginBottom: '0px', 
                                    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
                                }}
                                >
                                    {description}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )}
}
export default ParentMeetingItem;