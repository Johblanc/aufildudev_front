import { useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import { TTchat } from "../types/TTchat";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";

export function Tchat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMini, setIsMini] = useState(true);
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<TTchat[]>([]);
  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData.user.access_lvl > 0) {
      setIsVisible(true);
    }
  }, [userData.user]);

  const send = (value: string) => {
    const envoi = {
      pseudo: userData.user.pseudo,
      message: value,
      id: userData.user.id,
    };
    socket?.emit("message", JSON.stringify(envoi));
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    const result = JSON.parse(message);
    setMessages([...messages, result]);
    setIsVisible(true);
  };

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  });

  return (
    <div className={`tchat${isVisible ?"" : "-hidden"}`}>
      <div
        className={`${
          isMini && "tchat-mini"
        } side-column text-end p-2 border rounded scroll bg-dark`}
      >
        <Messages messages={messages} />
        <MessageInput send={send} />
      </div>
      <button className="tchat-button" onClick={() => setIsMini(!isMini)}>
        TCH
      </button>
    </div>
  );
}
