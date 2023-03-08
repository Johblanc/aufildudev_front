import { useContext, useState } from 'react';
import { UpdateCommentContext } from '../../../context/UpdateCommentContext';
import { BASE_URL } from '../../../constant/url';
import { TComment } from '../../types/TComment';
import { ModalUpdate } from '../ModalUpdate';
import { ArticleModal } from './ArticleModal';
import { AddComment } from './AddComment';

export function ArticleComments(props: { articleId: number }) {
    const { setComms } = useContext(UpdateCommentContext);
    const [commData, setCommData] = useState<TComment | undefined>();

    const getArticleComment = () =>{
        fetch(`${BASE_URL}/comments/article/${props.articleId}`)
            .then((response) => response.json())
            .then((data) => setComms(data.data))
            .catch((err) => console.error(err));
        
        }


    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#commentArticleList"
                onClick={getArticleComment}
            >
                Commentaires
            </button>
            <ArticleModal setCommData={setCommData} />
            <ModalUpdate commData={commData} />
            <AddComment articleId={props.articleId}/>
        </div>
    );
}
