import { useState, useContext } from 'react';
import { BASE_URL } from '../../../constant/url';
import { UpdateCommentContext } from '../../../context/UpdateCommentContext';
import { TComment } from '../../types/TComment';
import { ModalComment } from '../ModalComment';
import { ModalUpdate } from '../ModalUpdate';

export function AllComments() {
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
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#commentList"
                onClick={getAllComms}
            >
                Liste des commentaires
            </button>
            <ModalComment setCommData={setCommData} />
            <ModalUpdate commData={commData} setCommData={setCommData} />
        </div>
    );
}
