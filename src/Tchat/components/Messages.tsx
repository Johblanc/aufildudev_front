import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { TTchat } from "../types/TTchat";

export function Messages({ messages }: { messages: TTchat[] }) {
  const userData = useContext(UserContext);

  const BS_COMMUN = "text-break m-2 pt-2 pb-2 pe-3 ps-3 rounded-pill messages";
  const BS_USER = "bg-secondary align-self-end ";
  const BS_OTHER = "bg-info ";


  const preventDragHandler = (e: any) => {
    e.preventDefault();
  }

  return (
    <div className="d-flex flex-column">
      {messages.map((message, index) => (
        <div draggable onDragStart={preventDragHandler}
          className={`${BS_COMMUN} ${
            userData.user.pseudo === message.pseudo ? BS_USER : BS_OTHER
          }`}
          key={index}
        >
          <span className="bold">{message.pseudo}</span> : {message.message}
        </div>
      ))}
    </div>
  );
}
