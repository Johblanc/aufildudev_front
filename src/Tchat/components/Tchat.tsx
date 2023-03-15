import { CSSProperties, useContext, useEffect, useState } from "react";
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
  const [x, setX] = useState<number>(500);
  const [y, setY] = useState<number>(500);
  const [delta, setDelta] = useState({x: 0, y: 0})

  const [isDraggable, setIsDraggable]= useState<boolean>(false)

  
  const newImage = new Image(0,0)
  newImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

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

  function handleDragStart(event: any) {
    event.dataTransfer.setDragImage(newImage, 0,0)
    setDelta({
      x: event.clientX - x,
      y: event.clientY - y
    })
  }
  
  function handleDrag(event:any){
    setX(event.clientX - delta.x);
    setY(event.clientY - delta.y); 
  }

  function handleDragEnd(event: any){
    setX(event.clientX - delta.x);
    setY(event.clientY -  delta.y);
  }
  
  const dragStyle: CSSProperties = {
    position : 'absolute',
    left: x,
    top: y
  }

  return ( 
    <div draggable onDragStart={handleDragStart} onDrag={handleDrag} onDragEnd={handleDragEnd} className={` tchat${isVisible ?"" : "-hidden"}`} style={isDraggable ? dragStyle : {}} >
      <div
        className={`${
          isMini && "tchat-mini"
        } side-column text-end p-2 border rounded scroll bg-dark`}
      >
        <Messages messages={messages} />
        <MessageInput isDraggable={isDraggable} setIsDraggable={setIsDraggable} send={send}/>
      </div>
      <button className="tchat-button" onClick={() => setIsMini(!isMini)}>
        TCH
      </button>
    </div>
  );
}

