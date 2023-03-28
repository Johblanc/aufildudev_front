import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { TTchat } from '../types/TTchat';

export default function Message(props: { message: TTchat }) {
    const userData = useContext(UserContext);

    const BS_COMMUN = 'text-break m-2 pt-2 pb-2 pe-3 ps-3 rounded-4';
    const BS_USER = 'bg-secondary align-self-end';
    const BS_OTHER = 'bg-info align-self-start';

    const preventDragHandler = (e: any) => {
        e.preventDefault();
    };

    return (
        <div
            draggable
            onDragStart={preventDragHandler}
            className={`${BS_COMMUN} ${
                userData.user.pseudo === props.message.pseudo
                    ? BS_USER
                    : BS_OTHER
            }`}
        >
            <span className="bold ">{props.message.pseudo}</span> :{' '}
            {props.message.message}
        </div>
    );
}
