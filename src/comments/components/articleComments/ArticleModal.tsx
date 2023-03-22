import { useContext } from 'react';
import { UpdateCommentContext } from '../../../context/UpdateCommentContext';
import { UserContext } from '../../../context/UserContext';
import { TComment } from '../../types/TComment';
import { Comment } from '../Comment';

export function ArticleModal(props: {
    setCommData: React.Dispatch<React.SetStateAction<TComment | undefined>>;
}) {
    const { comms } = useContext(UpdateCommentContext);
    const userData = useContext(UserContext);

    const commentsElem = comms.map((elm, i) => (
        <div key={i}>
            <div className="modal-body modalcut">
                <Comment data={elm} setCommData={props.setCommData} />
            </div>
        </div>
    ));

    return (
        <div
            className="modal fade"
            id="commentArticleList"
            tabIndex={11}
            aria-labelledby="commentArticleList"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content scroll">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="commentArticleList"
                        >
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
                    <div className="modal-footer">
                        {userData.user.id !== -1 ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#addComment"
                            >
                                Ajouter un commentaire
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
