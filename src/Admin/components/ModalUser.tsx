import { TUser } from '../../navbar/types/TUser';
import User from './User';

export default function ModalUser(props: { userList: TUser[] }) {
    const userElem = props.userList
        .filter((elm) => elm.access_lvl < 4)
        .map((elm, i) => (
            <div key={i}>
                <div className="modal-body modalcut">
                    <User data={elm} />
                </div>
            </div>
        ));

    return (
        <div
            className="modal fade"
            id="userList"
            tabIndex={50}
            aria-labelledby="userList"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content scroll">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="commentList">
                            Utilisateurs
                        </h1>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    {userElem}
                </div>
            </div>
        </div>
    );
}
