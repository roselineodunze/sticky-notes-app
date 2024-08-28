import "../../index.css"
import { ArrowRotateRight } from "iconsax-react"
import DeleteButton from "./DeleteButton"
import { useRef, useEffect, useState, useContext } from "react"
import { setNewOffset, heightGrow, setZIndex, bodyParser } from "../../utils"
import { db } from "../../appwrite/databases"
import { NoteContext } from "../../context/NoteContext"

const NoteCard = ({ note }) => {
    const colors = bodyParser(note.colors);
    const body = bodyParser(note.body);
    const [position, setPosition] = useState(bodyParser(note.position))
    const [saving, setSaving] = useState(false)
    const {setSelectedNote, selectedNote} = useContext(NoteContext)

    const cardRef = useRef(null)
    const textAreaRef = useRef(null)
    const keyUpTimer = useRef(null)
    
    useEffect(() => {
        heightGrow(textAreaRef)
        setZIndex(cardRef.current)
    }, [])

    let mouseStartAxis = { x: 0, y:0 }
    const mouseDown = (e) => {
        if (e.target.className === "card-header"){
            mouseStartAxis.x = e.clientX
            mouseStartAxis.y = e.clientY
            document.addEventListener("mousemove", mouseMove)
            document.addEventListener("mouseup", mouseUp)

            setZIndex(cardRef.current)
            setSelectedNote(note)
        }
    }

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartAxis.x - e.clientX,
            y: mouseStartAxis.y - e.clientY
        }
        
        mouseStartAxis.x = e.clientX
        mouseStartAxis.y = e.clientY

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)

        setPosition(newPosition)
    }

    const mouseUp = (e) => {
        document.removeEventListener("mousemove", mouseMove)
        document.removeEventListener("mouseup", mouseUp)

        const newPosition = setNewOffset(cardRef.current)
        saveData("position", newPosition)
    }

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value)}
        try{
            db.notes.update(note.$id, payload)
        } catch(error){
            console.log(error)
        };
        setSaving(false)
    }

    const handleKeyUp = () => {
        setSaving(true)
        if (keyUpTimer.current){
            clearTimeout(keyUpTimer.current)
        }

        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value)
        }, 2000)
    }

    return (
    <div 
        className="card"
        ref={cardRef}
        style={{
            backgroundColor: colors.colorBody,
            left: `${position.x}px`,
            top: `${position.y}px`
        }}>
        <div 
            className="card-header"
            onMouseDown={mouseDown}
            style={{backgroundColor: colors.colorHeader}}>
            <DeleteButton
                noteId={note.$id}
            />
            { saving && (<div className="saving">
                <ArrowRotateRight className="saving-icon" size="24" color="#000"/>
                <p>Saving...</p>
                </div>
            )}
        </div>
        <div className="card-body">
            <textarea 
                onInput={() => { 
                    heightGrow(textAreaRef)
                }}
                onKeyUp={handleKeyUp}
                ref={textAreaRef}
                style={{ color: colors.colorText}} 
                defaultValue={body}
                onFocus={() => {
                    setZIndex(cardRef.current)
                    setSelectedNote(note)
                }}>
            </textarea>
        </div>
    </div>
)}

export default NoteCard