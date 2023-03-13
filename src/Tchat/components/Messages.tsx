import { TTchat } from "../types/TTchat";

export function Messages({messages}: {messages: TTchat[]}){
    return <div>
        {messages.map((message, index) => 
        <div key={index}>{message.pseudo} : {message.message}</div>)}
    </div>
}