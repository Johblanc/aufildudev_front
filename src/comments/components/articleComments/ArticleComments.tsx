import { useContext, useState } from 'react';
import { UpdateCommentContext } from '../../../context/UpdateCommentContext';
import { BASE_URL } from '../../../constant/url';
import { TComment } from '../../types/TComment';
import { ModalComment } from '../ModalComment';
import { ModalUpdate } from '../ModalUpdate';

export function ArticleComments(props: { articleId: number }) {
    const { setComms } = useContext(UpdateCommentContext);
    const [commData, setCommData] = useState<TComment | undefined>();

    const getArticleComment = () =>
        fetch(`${BASE_URL}/comments/article/${props.articleId}`)
            .then((response) => response.json())
            .then((data) => setComms(data.data))
            .catch((err) => console.error(err));

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#commentList"
                onClick={getArticleComment}
            >
                Commentaires
            </button>
            <ModalComment setCommData={setCommData} />
            <ModalUpdate commData={commData} />
        </div>
    );
}
