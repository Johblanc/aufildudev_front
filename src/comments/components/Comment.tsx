import { TComment } from '../types/TComment';

export function Comment(props: { data: TComment }) {
    const comm = props.data;

    const date = new Date(comm.created_at).toLocaleDateString('fr');

    return (
        <div className="">
            <p>
                <span className="bold">by</span> {comm.user.pseudo}
            </p>
            <p className="bold">{comm.content}</p>
            <p>Crée le {date}</p>
            {comm.updated_at ? <p>Modifié le {date}</p> : ''}
        </div>
    );
}
