import { TComment } from '../types/TComment';
import { BASE_URL } from '../../constant/url';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { Comment } from './Comment';
import { UpdateCommentContext } from '../../context/UpdateCommentContext';

export function ModalCommentUser(props: {
    setCommData: React.Dispatch<React.SetStateAction<TComment | undefined>>;
}) {
    const { comms, setComms } = useContext(UpdateCommentContext);
    const userData = useContext(UserContext);
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userData.user.access_token}`,
        },
    };

    const deleteComm = (index: number) => {
        fetch(`${BASE_URL}/comments/${index}`, options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .then(() => setComms(comms.filter((item) => item.id !== index)))
            .catch((err) => console.error(err));
    };
    const commentsElem = comms.map((elm, i) => (
        <div key={i}>
            <div className="modal-body">
                <Comment data={elm} />
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-target="#updateUserComment"
                    data-bs-toggle="modal"
                    onClick={() => props.setCommData(elm)}
                >
                    Modifier
                </button>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteComm(elm.id)}
                >
                    Supprimer
                </button>
            </div>
        </div>
    ));
    return (
        <div
            className="modal fade"
            id="commentUserList"
            tabIndex={15}
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
