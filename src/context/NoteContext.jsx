import { createContext, useEffect, useState } from "react";
import { ArrowRotateRight } from "iconsax-react"
import { db } from "../appwrite/databases";

export const NoteContext = createContext()

const NoteProvider = ({children}) =>{
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const response = await db.notes.list()
        setNotes(response.documents)
        setLoading(false)
    }

    const contextData = { notes, setNotes, selectedNote, setSelectedNote}
    return <NoteContext.Provider value={contextData}>
        { loading ? <div style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}><ArrowRotateRight
        className="saving-icon" size="100" color="#fff"/></div> : children}
    </NoteContext.Provider>
}

export default NoteProvider;