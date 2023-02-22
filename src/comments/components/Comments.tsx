import { ModalComment } from './ModalComment';
import { ModalUpdate } from './ModalUpdate';

export function Comments() {
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#commentList"
            >
                Commentaires
            </button>
            <ModalComment />
            <ModalUpdate />
        </div>
    );
}
