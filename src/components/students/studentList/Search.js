import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <React.Fragment>
                <form className="form-inline d-flex justify-content-center d-print-none">
                    <input
                        className="form-control search"
                        id="filterInput"
                        type="search"
                        placeholder="Search name, reg no, dob"
                        value={this.props.search}
                        onChange={this.props.filterValue} 
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                              event.preventDefault();
                            }
                        }}
                    />
                </form>
            </React.Fragment>
        )
    }
}

export default Search;