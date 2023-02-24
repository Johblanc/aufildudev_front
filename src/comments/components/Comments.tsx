import { useState, useEffect } from 'react';
import { TComment } from '../types/TComment';
import { ModalComment } from './ModalComment';
import { ModalUpdate } from './ModalUpdate';

export function Comments() {
    const [comms, setComms] = useState<TComment[]>([]);
    const [commData, setCommData] = useState<TComment | undefined>();

    useEffect(() => {
        fetch('http://localhost:3000/api/comments').then((response) =>
            response.json().then((data) => setComms(data.data))
        );
    }, []);

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#commentList"
            >
                Commentaires
            </button>
            <ModalComment
                comms={comms}
                setComms={setComms}
                setCommData={setCommData}
            />
            <ModalUpdate
                comms={comms}
                setComms={setComms}
                commData={commData}
            />
        </div>
    );
}
