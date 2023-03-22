import { useContext, useState } from 'react';
import { BASE_URL } from '../../../constant/url';
import { UpdateCommentContext } from '../../../context/UpdateCommentContext';
import { UserContext } from '../../../context/UserContext';

export function AddComment(props: { articleId: number }) {
    const userData = useContext(UserContext);
    const [bodyContent, setBodyContent] = useState('');
    const { comms, setComms } = useContext(UpdateCommentContext);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.access_token}`,
        },
        body: `{"content": "${bodyContent}","article_id": ${props.articleId}}`,
    };

    const addNewComment = () =>
        fetch(`${BASE_URL}/comments`, options)
            .then((response) => response.json())
            .then((response) => response.data)
            .then((response) => {
                const newComments = [...comms];
                newComments.push(response);
                setComms(newComments);
            })
            .catch((err) => console.error(err));

    return (
        <div>
            <div
                className="modal fade"
                id="addComment"
                aria-hidden="true"
                aria-labelledby="addComment"
                tabIndex={30}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content size">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addComment">
                                Nouveau commentaire
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
                                    addNewComment();
                                }}
                            >
                                <textarea
                                    className="form-control"
                                    style={{ height: 100 }}
                                    onChange={(e) =>
                                        setBodyContent(e.target.value)
                                    }
                                ></textarea>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-2"
                                        data-bs-target="#commentArticleList"
                                        data-bs-toggle="modal"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                data-bs-target="#commentArticleList"
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
