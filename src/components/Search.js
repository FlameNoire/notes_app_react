import React, { Component } from 'react';

export default class Search extends Component {
    render() {
        return (
            <div className="notes-search">
                <input type="text" placeholder="Search..." onChange={this.props.onSearch} />
            </div>
        );
    }
}