import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add New Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title"  placeholder="Enter title here.." onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrition</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag " value={note.tag} name="tag" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary mb-3" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote
