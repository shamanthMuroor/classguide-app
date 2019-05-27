import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <React.Fragment>
                <form className="form-inline d-flex justify-content-center">
                    <input
                        className="form-control mt-2 mr-md-2"
                        id="filterInput"
                        type="search"
                        placeholder="Search"
                        value={this.props.search}
                        onChange={this.props.filterValue} />
                </form>
            </React.Fragment>
        )
    }
}

export default Search;