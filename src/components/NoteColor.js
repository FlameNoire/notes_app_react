import React, { Component } from 'react';

export default class NoteColor extends Component {
    render() {
        let style = { backgroundColor: this.props.color };
        return <a href="#"
                  className="note-colors-item"
                  style={style}
                  value={this.props.color}
                  onClick={this.props.onColorSet} />
    }
}