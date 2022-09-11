import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
   
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click(); 
        props.showAlert("Updated Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlerts={props.showAlerts}/>

            <button type="button" ref={ref} className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" placeholder="Enter title here.." onChange={onChange} minLength={5} required  />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descrition</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag " value={note.etag} name="etag" onChange={onChange} minLength={5} required/>
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <h5>{notes.length === 0 && 'No Notes available'}</h5>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlerts={props.showAlerts} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes