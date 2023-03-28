import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { TComment } from '../types/TComment';
import { BASE_URL } from '../../constant/url';
import { UpdateCommentContext } from '../../context/UpdateCommentContext';

export function Comment(props: {
    data: TComment;
    setCommData: React.Dispatch<React.SetStateAction<TComment | undefined>>;
}) {
    const comm = props.data;
    const userData = useContext(UserContext);
    const { comms, setComms } = useContext(UpdateCommentContext);
    const [onDelete, setOnDelete] = useState<boolean>(false)

    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userData.user.access_token}`,
        },
    };

    const deleteComm = (index: number) => {
        fetch(`${BASE_URL}/comments/${index}`, options)
            .then((response) => response.json())
            .then(() => setComms(comms.filter((item) => item.id !== index)))
            .catch((err) => console.error(err));
    };

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
            <div className="align-self-end ">
                {userData.user?.pseudo === comm.user.pseudo ? (
                    <button
                        type="button"
                        className="btn btn-primary btn-sm btn-comms m-2"
                        data-bs-target="#updateComment"
                        data-bs-toggle="modal"
                        onClick={() => {
                            props.setCommData(comm);
                        }}
                    >
                        Modifier
                    </button>
                ) : (
                    ''
                )}
                {userData.user.access_lvl > 2 ||
                userData.user?.pseudo === comm.user.pseudo ? onDelete === false ? <button
                    type="button"
                    className="btn btn-danger btn-sm btn-comms"
                    onClick={() => setOnDelete(true)}
                >
                    Supprimer
                </button> : <><button
                    type="button"
                    className="btn btn-danger btn-sm btn-comms me-2"
                    onClick={() => {deleteComm(comm.id);
                        setOnDelete(false)
                    }}
                >
                    Valider la suppression 
                </button><button
                    type="button"
                    className="btn btn-primary btn-sm btn-comms me-2"
                    onClick={() => setOnDelete(false)}
                >
                    Annuler la suppression 
                </button></> : ''}
            </div>
        </div>
    );
}
