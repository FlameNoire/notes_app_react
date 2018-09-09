import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import NoteEditor from './NoteEditor';
import NotesGrid from './NotesGrid';
import Search from './Search';

class NotesApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: 0,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorum eveniet fugiat inventore nemo quae totam ullam ut? Consequuntur harum molestias soluta. Aliquam beatae consequatur delectus dignissimos eius et explicabo, iste iure labore nemo officia perspiciatis quos reprehenderit veniam voluptate.',
                    color: '#20b2aa'
                },
                {
                    id: 1,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorum eveniet fugiat inventore nemo quae totam ullam ut? Consequuntur harum molestias soluta. Aliquam beatae consequatur delectus dignissimos eius et explicabo.',
                    color: '#ff7373'
                },
                {
                    id: 2,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorum eveniet fugiat inventore nemo quae totam ullam ut? Consequuntur harum molestias soluta. Aliquam beatae consequatur delectus dignissimos eius et explicabo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorum eveniet fugiat inventore nemo quae totam ullam ut? Consequuntur harum molestias soluta. Aliquam beatae consequatur delectus dignissimos eius et explicabo.',
                    color: '#20b2aa'
                },
                {
                    id: 3,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorum eveniet fugiat inventore nemo quae totam ullam ut? Consequuntur harum molestias soluta. Aliquam beatae consequatur delectus dignissimos eius et explicabo.',
                    color: '#ff7373'
                },
            ],
            defaultNotes: [],
            searchText: ''
        };

        this.onNoteAdd = this.onNoteAdd.bind(this);
        this.onNoteDelete = this.onNoteDelete.bind(this);
        this.notesSearch = this.notesSearch.bind(this);
        this._updateLocalStorage = this._updateLocalStorage.bind(this);
    }

    componentDidMount() {
        let localNotes = JSON.parse(localStorage.getItem('notes'));
        if(localNotes) {
            this.setState({ notes: localNotes })
            this.setState({ defaultNotes: localNotes })
        }
    }

    componentDidUpdate() {
        this._updateLocalStorage();
    }

    // static getDerivedStateFromProps(props, state) {
    //     // ...
    // }

    onNoteAdd(newNote) {
        let newNotes = [newNote, ...this.state.notes];
        this.setState({ notes: newNotes });
        this.setState({ defaultNotes: newNotes });
    }

    onNoteDelete(note) {
        let noteID = note.id;
        let newNotes = this.state.notes.filter(note => {
            return note.id !== noteID;
        })
        this.setState({ notes: newNotes });
        this.setState({ defaultNotes: newNotes });
    }

    notesSearch(event) {
        let notes = this.state.notes;
        let searchQuery = event.target.value.toLowerCase();

        this.setState({
            // defaultNotes: notes,
            searchText: searchQuery
        });

        let displayedNotes = notes.filter(function(el) {
            let searchValue = el.text.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        if(searchQuery){
            this.setState({
                notes: displayedNotes
            });
        } else {
            this.setState({
                notes: this.state.defaultNotes
            });
        }
    }

    _updateLocalStorage() {
        let notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }

    render() {
        return(
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.onNoteAdd} />
                <Search onSearch={this.notesSearch} notes={this.state.notes} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.onNoteDelete} />
            </div>
        )
    }
}

export default hot(module)(NotesApp);