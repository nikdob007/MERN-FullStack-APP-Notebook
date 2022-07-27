import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
        //  API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjOTBmZjVhZDEyYWE5MmIxODJlNTAyIn0sImlhdCI6MTY1NzM0NTQ4MX0.L95VgPlhnJI58OEQAzalbgFYZKj3WwWDE8bJc5nJIzw'
            }
        });
        const json = await response.json();
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO : API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjOTBmZjVhZDEyYWE5MmIxODJlNTAyIn0sImlhdCI6MTY1NzM0NTQ4MX0.L95VgPlhnJI58OEQAzalbgFYZKj3WwWDE8bJc5nJIzw'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
       
        // const note = {
        //     "_id": "62caa588db9641607087ad471",
        //     "user": "62c90ff5ad12aa92b182e502",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "timestamp": "2022-07-10T10:10:16.863Z",
        //     "__v": 0
        // };
        // setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // TODO : API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjOTBmZjVhZDEyYWE5MmIxODJlNTAyIn0sImlhdCI6MTY1NzM0NTQ4MX0.L95VgPlhnJI58OEQAzalbgFYZKj3WwWDE8bJc5nJIzw'
            }
        });
        const json =   response.json();
        
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    // Update a Note
    const editNote = async (id, title, description, tag) => {
        // TODO : API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjOTBmZjVhZDEyYWE5MmIxODJlNTAyIn0sImlhdCI6MTY1NzM0NTQ4MX0.L95VgPlhnJI58OEQAzalbgFYZKj3WwWDE8bJc5nJIzw'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;