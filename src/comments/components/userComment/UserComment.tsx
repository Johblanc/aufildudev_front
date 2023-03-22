import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { TComment } from '../../types/TComment';
import { BASE_URL } from '../../../constant/url';
import { UpdateCommentContext } from '../../../context/UpdateCommentContext';
import { ModalComment } from '../ModalComment';
import { ModalUpdate } from '../ModalUpdate';

export function UserComment() {
    const { setComms } = useContext(UpdateCommentContext);
    const userData = useContext(UserContext);
    const [commData, setCommData] = useState<TComment | undefined>();

    const getComments = () => {
        fetch(`${BASE_URL}/comments/user/${userData.user.id}`)
            .then((response) => response.json())
            .then((data) => setComms(data.data))
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#commentList"
                onClick={getComments}
            >
                Commentaires User
            </button>
            <ModalComment setCommData={setCommData} />
            <ModalUpdate commData={commData} setCommData={setCommData} />
        </div>
    );
}
