import { TComment } from '../types/TComment';

export function Comment(props: { data: TComment }) {
    const comm = props.data;

    const created = new Date(comm.created_at).toLocaleDateString('fr');
    const updated = new Date(comm.updated_at).toLocaleDateString('fr');

    return (
        <div className="d-flex flex-column">
            <p className="align-self-end">
                <span className="bold">by</span> {comm.user.pseudo}
            </p>
            <p className="bold pb-3">{comm.content}</p>

            {comm.updated_at ? (
                <p className="fst-italic small-size">
                    <span className="bold">Modifié</span> le {updated}
                </p>
            ) : (
                <p className="fst-italic small-size">
                    <span className="bold">Crée</span> le {created}
                </p>
            )}
        </div>
    );
}
