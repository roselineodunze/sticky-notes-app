import {React, useContext} from 'react'
import { Trash } from "iconsax-react"
import { db } from '../../appwrite/databases'
import { NoteContext } from '../../context/NoteContext'

const DeleteButton = ({ noteId }) => {
    const {setNotes} = useContext(NoteContext)
    
    const handleDelete = async () => {
        db.notes.delete(noteId)
        setNotes((prevState) => {
            const updatedNotes = prevState.filter((note) => note.$id !== noteId)
            return updatedNotes;
        })
    }
  return (
    <div onClick={handleDelete}>
        <Trash size="24" color="#000"/>
    </div>
  )
}

export default DeleteButton
