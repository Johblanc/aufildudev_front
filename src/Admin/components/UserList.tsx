import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { BASE_URL } from '../../constant/url';
import { TUser } from '../../navbar/types/TUser';
import ModalUser from './ModalUser';

export default function UserList() {
    const userData = useContext(UserContext);
    const [userList, setUserList] = useState<TUser[]>([]);

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userData.user.access_token}`,
        },
    };

    const getUsers = () =>
        fetch(`${BASE_URL}/users/findallusers/`, options)
            .then((response) => response.json())
            .then((response) => setUserList(response.data))
            .catch((err) => console.error(err));

    return (
        <>
            <button
                type="button"
                className="btn btn-primary text-dark w-100 mb-3"
                data-bs-toggle="modal"
                data-bs-target="#userList"
                onClick={getUsers}
            >
                Liste des utilisateurs
            </button>
            <ModalUser userList={userList} />
        </>
    );
}
