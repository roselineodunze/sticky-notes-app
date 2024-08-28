import React, { useContext } from 'react'
import { NoteContext } from '../../context/NoteContext'
import { db } from '../../appwrite/databases'

const Color = ({color}) => {
    const {selectedNote, notes, setNotes} = useContext(NoteContext)

    const changeColor = () => {
        const payload = { colors: JSON.stringify(color)}
        try{
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            )

            const updatedNote = {
                ...notes[currentNoteIndex],
                ...payload
            }

            const newNotes = [...notes]
            newNotes[currentNoteIndex] = updatedNote
            setNotes(newNotes)

            db.notes.update(selectedNote.$id, payload)
        } catch(error){
            console.log(error)
            alert("You must select a note before changing colors.")
        };
    
    }

  return (
    <div className='color' onClick={changeColor} style={{backgroundColor: color.colorHeader}}>
    </div>
  )
}

export default Color
