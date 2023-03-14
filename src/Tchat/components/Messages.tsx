import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { TTchat } from "../types/TTchat";

export function Messages({ messages }: { messages: TTchat[] }) {
  const userData = useContext(UserContext);

  const BS_COMMUN = "text-break m-1 p-1 border-bottom";
  const BS_USER = "bg-secondary";
  const BS_OTHER = "bg-info";


  return (
    <>
      {messages.map((message, index) => (
        <div
          className={`${BS_COMMUN} ${
            userData.user.pseudo === message.pseudo ? BS_USER : BS_OTHER
          }`}
          key={index}
        >
          {message.pseudo} : {message.message}
        </div>
      ))}
    </>
  );
}
