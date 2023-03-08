import { useState } from "react"

export function MessageInput({send}: {send: (value: string)=> void}){
    const [value, setValue] =useState('')
    return(
        <>
        <input placeholder="Message..." value={value} onChange={(e) => setValue(e.target.value)}/>
        <button onClick={() => send(value)}> Envoyer</button>
        </>
    )
}