import {React, useRef, useContext} from 'react'
import { Add } from "iconsax-react"
import colors from "../colors.json"
import { db } from '../../appwrite/databases'
import { NoteContext } from '../../context/NoteContext'

const AddButton = () => {
    const {setNotes} = useContext(NoteContext)
    const startingPos = useRef(10)

    const addNote = async () => {
        console.log("added")
        const payload = {
          position: JSON.stringify({
            x: startingPos.current,
            y: startingPos.current,
          }),
          colors: JSON.stringify(colors[0])
        }
        startingPos.current += 10
        const response = await db.notes.create(payload)
        setNotes((prevState) => [response, ...prevState])
    }

  return (
    <div id='add-btn' onClick={addNote}>
      <Add size="32" color="#FFf"/>
    </div>
  )
}

export default AddButton
