import { CSSProperties, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { UserContext } from '../../context/UserContext';
import { TTchat } from '../types/TTchat';
import { MessageInput } from './MessageInput';
import { Messages } from './Messages';

export function Tchat() {
    const [selected, setSelected] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMini, setIsMini] = useState(true);
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<TTchat[]>([]);
    const userData = useContext(UserContext);
    const [x, setX] = useState<number>(500);
    const [y, setY] = useState<number>(500);
    const [delta, setDelta] = useState({ x: 0, y: 0 });

    const [isDraggable, setIsDraggable] = useState<boolean>(false);

    const newImage = new Image(0, 0);
    newImage.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    useEffect(() => {
        if (userData.user.access_lvl > 0) {
            setIsVisible(true);
        }
    }, [userData.user]);

    //Fonction permettant l'envoie d'un message
    const send = (value: string) => {
        const envoi = {
            pseudo: userData.user.pseudo,
            message: value,
            id: userData.user.id,
        };
        socket?.emit('message', JSON.stringify(envoi));
    };
    
    //Connexion au Websocket dans le back
    useEffect(() => {
        const newSocket = io('https://aufildudev-back.onrender.com/');
        setSocket(newSocket);
    }, [setSocket]);

    //Reception des messages pour affichage du tchat
    const messageListener = (message: string) => {
        const result = JSON.parse(message);
        setMessages([...messages, result]);
        setIsVisible(true);
    };
    
    //"Ecoute" en permanence le serveur
    useEffect(() => {
        socket?.on('message', messageListener);
        return () => {
            socket?.off('message', messageListener);
        };
    });

    function handleDragStart(event: any) {
        event.dataTransfer.setDragImage(newImage, 0, 0);
        setDelta({
            x: event.clientX - x,
            y: event.clientY - y,
        });
    }

    function handleDrag(event: any) {
        setX(event.clientX - delta.x);
        setY(event.clientY - delta.y);
    }

    function handleDragEnd(event: any) {
        setX(event.clientX - delta.x);
        setY(event.clientY - delta.y);
    }

    const dragStyle: CSSProperties = {
        position: 'absolute',
        left: x,
        top: y,
    };

    const toggleClass = () => {
        setSelected(!selected);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className={` tchat${isVisible ? '' : '-hidden'}`}
            style={isDraggable ? dragStyle : {}}
        >
            <div
                className={`${
                    isMini && 'tchat-mini'
                } side-column text-end p-2 shadow-lg border border-success rounded scroll bg-dark m-1`}
            >
                <Messages messages={messages} />
                <MessageInput
                    isDraggable={isDraggable}
                    setIsDraggable={setIsDraggable}
                    send={send}
                />
            </div>
            <button
                className="tchat-button btn btn-primary rounded-circle mt-2"
                onClick={() => {
                    setIsMini(!isMini);
                    toggleClass();
                }}
            >
                {selected === false ? (
                    <i className="bi bi-chat-quote"></i>
                ) : (
                    <i className="bi bi-chat-quote-fill"></i>
                )}
            </button>
        </div>
    );
}
