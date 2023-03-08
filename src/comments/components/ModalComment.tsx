import { useContext } from 'react';
import { TComment } from '../types/TComment';
import { Comment } from './Comment';
import { UpdateCommentContext } from '../../context/UpdateCommentContext';

export function ModalComment(props: {
    setCommData: React.Dispatch<React.SetStateAction<TComment | undefined>>;
}) {
    const { comms } = useContext(UpdateCommentContext);

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
            id="commentList"
            tabIndex={11}
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
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#commentList"
                        >
                            Liste des commentaires
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
