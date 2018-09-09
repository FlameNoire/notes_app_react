import React, { Component } from 'react';
import Note from './Note';

export default class NotesGrid extends Component {

    componentDidMount() {
        let grid = this.refs.grid;

        this.msnry = new Masonry( grid, {
            // options
            itemSelector: '.note',
            columnWidth: 220,
            gutter: 10
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }

    render() {
        let onNoteDelete = this.props.onNoteDelete;

        return(
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(note => {
                        return (
                            <Note key={note.id} color={note.color} onDelete={onNoteDelete.bind(null, note)}>{note.text}</Note>
                        )
                    })
                }
            </div>
        )
    }
}