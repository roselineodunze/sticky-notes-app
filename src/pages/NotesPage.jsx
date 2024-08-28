import {React, useContext} from "react";
import NoteCard from "../assets/Componenets/NoteCard";
import { NoteContext } from "../context/NoteContext";
import Controls from "../assets/Componenets/Controls";

const NotesPage = () => {
    const {notes} = useContext(NoteContext)
    return (
            <div>
                {notes.map(note => (
                    <NoteCard key={note.$id} note={note}/>
                ))}
                <Controls/>
            </div>
    )
}

export default NotesPage;
