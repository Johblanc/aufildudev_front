import { useState, useEffect } from 'react';
import { TComment } from '../types/TComment';
import { Comment } from './Comment';

export function Comments() {
    const [comms, setComms] = useState<TComment[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/comments').then((response) =>
            response.json().then((data) => setComms(data.data))
        );
    }, []);
    console.log(comms);

    const commentsElem = comms.map((elm, i) => <Comment key={i} data={elm} />);

    return <div>{commentsElem}</div>;
}
