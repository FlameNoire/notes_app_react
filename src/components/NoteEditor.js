import React, { Component } from 'react';
import NoteColor from './NoteColor';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            colors: [
                '#ffc0cb',
                '#b0e0e6',
                '#cccccc',
                '#ff7373',
                '#333333',
                '#fa8072',
                '#20b2aa'
            ],
            currentColor: 'yellow'
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.colorSet = this.colorSet.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        let newNote = {
            id: Date.now(),
            text: this.state.text,
            color: this.state.currentColor
        }

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' })
    }

    onTextChange(e) {
        this.setState({ text: e.target.value });
    }

    colorSet(color) {
        this.setState({ currentColor: color});
    }

    render() {
        var onColorChange = this.colorSet;
        return(
            <div className="note-editor">
                <textarea
                    placeholder="Write your note here..."
                    rows={5} className="textarea"
                    value={this.state.text}
                    onChange={this.onTextChange}
                />
                <div className="note-colors">
                    {
                        this.state.colors.map(function (colorItem, index) {
                            return <NoteColor key={index}
                                          onColorSet={onColorChange.bind(null, colorItem)}
                                          color={colorItem} />
                        })
                    }
                </div>
                <button className="add-button" onClick={this.onSubmit}>Add</button>
            </div>
        )
    }
}