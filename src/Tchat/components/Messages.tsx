import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { TTchat } from "../types/TTchat";

export function Messages({messages}: {messages: TTchat[]}){
    const userData = useContext(UserContext)

return <>{messages.map((message, index) => {return userData.user.pseudo === message.pseudo ? 
     <div className="text-break m-1 p-1 border-bottom bg-secondary" key={index}>{message.pseudo} : {message.message}</div> : <div className="text-break m-1 p-1 border-bottom bg-info" key={index}>{message.pseudo} : {message.message}</div>})}</>}
