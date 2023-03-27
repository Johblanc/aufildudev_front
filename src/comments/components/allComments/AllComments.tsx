import { useState, useContext } from 'react';
import { BASE_URL } from '../../../constant/url';
import { UpdateCommentContext } from '../../../context/UpdateCommentContext';
import { TComment } from '../../types/TComment';
import { ModalComment } from '../ModalComment';
import { ModalUpdate } from '../ModalUpdate';

export function AllComments(props: {
    page: 'Article' | 'Profile' | 'Accueil' | 'Admin';
}) {
    const { setComms } = useContext(UpdateCommentContext);
    const [commData, setCommData] = useState<TComment | undefined>();

    const getAllComms = () =>
        fetch(`${BASE_URL}/comments`).then((response) =>
            response.json().then((data) => setComms(data.data))
        );

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary text-dark w-100 mb-3"
                data-bs-toggle="modal"
                data-bs-target="#commentList"
                onClick={getAllComms}
            >
                {props.page === 'Profile' ? 'Modération' : 'Commentaires'}
            </button>
            <ModalComment setCommData={setCommData} />
            <ModalUpdate commData={commData} setCommData={setCommData} />
        </div>
    );
}
