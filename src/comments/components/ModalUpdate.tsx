import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { TComment } from '../types/TComment';
import { BASE_URL } from '../../constant/url';

export function ModalUpdate(props: {
    comms: TComment[];
    setComms: React.Dispatch<React.SetStateAction<TComment[]>>;
    commData: TComment | undefined;
}) {
    const user = useContext(UserContext);

    const [bodyContent, setBodyContent] = useState('');

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwc2V1ZG8iOiJBenVyaWVzIiwic3ViIjoxLCJpYXQiOjE2NzcwNzcyMTd9.knPilEMv3ZBqweToAiFx1QJD6WvypgnGrifg6MC7U-k',
        },
        body: `{"content": "${bodyContent}"}`,
    };

    const updater = () => {
        console.log(props.commData?.id);

        fetch(`${BASE_URL}/api/comments/${props.commData?.id}`, options)
            .then((response) => response.json())
            .then((response) => response.data)
            .then((response) => {
                /** Copy de la base local pour marquer la difference entre l'avant et l'apres */
                const newComms = [...props.comms];
                /** L'index du commentaire modifié dans la table local */
                const index = props.comms
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
                props.setComms(newComms);
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
                tabIndex={10}
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
                                    placeholder="Modifie ton commentaire ici"
                                    id="floatingTextarea2"
                                    style={{ height: 100 }}
                                    onChange={(e) => {
                                        setBodyContent(e.target.value);
                                        console.log(bodyContent);
                                    }}
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
