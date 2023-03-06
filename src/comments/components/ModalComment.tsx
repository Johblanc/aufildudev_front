import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { TComment } from '../types/TComment';
import { Comment } from './Comment';
import { BASE_URL } from '../../constant/url';

export function ModalComment(props: {
    comms: TComment[];
    setComms: React.Dispatch<React.SetStateAction<TComment[]>>;
    setCommData: React.Dispatch<React.SetStateAction<TComment | undefined>>;
}) {
    const userData = useContext(UserContext);

    const options = {
        method: 'DELETE',
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwc2V1ZG8iOiJTaGlubyIsInN1YiI6MiwiaWF0IjoxNjc3MDc3MjYxfQ.whcvLRbqE6O9B-qUhVqabvBMvJkK8ghUiJ2X6VEdNI0',
        },
    };

    const deleteComm = (index: number) => {
        fetch(`${BASE_URL}/api/comments/${index}`, options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .then(() =>
                props.setComms(props.comms.filter((item) => item.id !== index))
            )
            .catch((err) => console.error(err));
    };

    console.log(userData);

    const commentsElem = props.comms.map((elm, i) => (
        <div key={i}>
            <div className="modal-body">
                <Comment data={elm} />
            </div>
            <div className="modal-footer">
                {userData.user?.pseudo === elm.user.pseudo ? (
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-target="#updateComment"
                        data-bs-toggle="modal"
                        onClick={() => props.setCommData(elm)}
                    >
                        Modifier
                    </button>
                ) : (
                    ''
                )}
                {userData.user.access_lvl > 2 ||
                userData.user?.pseudo === elm.user.pseudo ? (
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteComm(elm.id)}
                    >
                        Supprimer
                    </button>
                ) : (
                    ''
                )}
            </div>
        </div>
    ));

    return (
        <div
            className="modal fade"
            id="commentList"
            tabIndex={10}
            aria-labelledby="commentList"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content scroll">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="commentList">
                            Commentaires
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    {commentsElem}
                </div>
            </div>
        </div>
    );
}
