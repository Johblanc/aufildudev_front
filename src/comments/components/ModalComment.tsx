import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { TComment } from '../types/TComment';
import { Comment } from './Comment';

export function ModalComment() {
    const [comms, setComms] = useState<TComment[]>([]);

    const user = useContext(UserContext);

    console.log(user);

    useEffect(() => {
        fetch('http://localhost:3000/api/comments').then((response) =>
            response.json().then((data) => setComms(data.data))
        );
    }, []);

    const commentsElem = comms.map((elm, i) => (
        <div key={i}>
            <div className="modal-body">
                <Comment data={elm} />
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-target="#updateComment"
                    data-bs-toggle="modal"
                >
                    Modifier
                </button>
                <button type="button" className="btn btn-danger">
                    Supprimer
                </button>
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
