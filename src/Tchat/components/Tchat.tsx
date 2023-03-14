import { useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { UserContext } from '../../context/UserContext';
import { TTchat } from '../types/TTchat';
import { MessageInput } from './MessageInput';
import { Messages } from './Messages';

export function Tchat(){
    const [socket, setSocket]= useState<Socket>()
    const [messages, setMessages]= useState<TTchat[]>([])
    const userData = useContext(UserContext)

    const send = (value: string) => {
        const envoi = {pseudo: userData.user.pseudo, message: value, id: userData.user.id}
        socket?.emit('message', JSON.stringify(envoi))
    }

    useEffect(() => {
        const newSocket=io('http://localhost:8001')
        setSocket(newSocket)
    }, [setSocket])

    const messageListener = (message: string) => {
        const result = JSON.parse(message)
        setMessages([...messages, result])
    }

    useEffect(() => {
        socket?.on('message', messageListener)
        return () => {socket?.off('message', messageListener )}
    })

    return (
        <div className='side-column text-end p-2 border rounded tchat scroll bg-dark'>
        <Messages messages={messages}/>
        <MessageInput send={send}/>
        </div>
    )
}