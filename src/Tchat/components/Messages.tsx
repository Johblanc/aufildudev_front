import { TTchat } from "../types/TTchat";
import Message from "./Message";

export function Messages(props: { messages :  TTchat[] }) {

  return (
    <div className="d-flex flex-column">
      {props.messages.map((message, index) => <div key={index}><Message message={message}/></div> 
      )}
    </div>
  ) 
}
