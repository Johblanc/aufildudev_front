import { useState, useContext } from 'react';
import { TComment } from '../types/TComment';
import { BASE_URL } from '../../constant/url';
import { UserContext } from '../../context/UserContext';
import { UpdateCommentContext } from '../../context/UpdateCommentContext';

export function ModalUpdate(props: { commData: TComment | undefined }) {
    const [bodyContent, setBodyContent] = useState('');
    const userData = useContext(UserContext);
    const { comms, setComms } = useContext(UpdateCommentContext);

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.access_token}`,
        },
        body: `{"content": "${bodyContent}"}`,
    };

    const updater = () => {
        fetch(`${BASE_URL}/comments/${props.commData?.id}`, options)
            .then((response) => response.json())
            .then((response) => response.data)
            .then((response) => {
                /** Copy de la base local pour marquer la difference entre l'avant et l'apres */
                const newComms = [...comms];
                /** L'index du commentaire modifié dans la table local */
                const index = comms
                    .map((item, i) => {
                        // Récupération de l'id et l'index pour chaque commentaire
                        return { selfId: item.id, index: i };
                    })
                    .filter(
                        (item) => item.selfId === props.commData?.id
                    )[0].index;

                // mise à jour de la copy avec la nouvelle modif
                newComms[index] = response;

                // Sauvegarde de la copy à la place de l'orginal
                setComms(newComms);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <div
                className="modal fade"
                id="updateComment"
                aria-hidden="true"
                aria-labelledby="updateComment"
                tabIndex={12}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content size">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateComment">
                                Modification
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="form-floating modal-body">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    updater();
                                }}
                            >
                                <textarea
                                    className="form-control"
                                    defaultValue={props.commData?.content}
                                    style={{ height: 100 }}
                                    onChange={(e) =>
                                        setBodyContent(e.target.value)
                                    }
                                ></textarea>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-2"
                                        data-bs-target="#commentList"
                                        data-bs-toggle="modal"
                                    >
                                        Envoyer
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                data-bs-target="#commentList"
                                data-bs-toggle="modal"
                            >
                                Retour
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
