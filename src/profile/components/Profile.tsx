import { useContext, useState } from 'react';
import { AllComments } from '../../comments/components/allComments/AllComments';
import { UserComment } from '../../comments/components/userComment/UserComment';
import { BASE_URL } from '../../constant/url';
import { UserContext } from '../../context/UserContext';
import '../style/profile-style.css';
import UpdateProfil from './UpdateProfile';

export function Profile() {
    const userData = useContext(UserContext);
    const [updating, setUpdating] = useState<boolean>(false);
    const [mail, setMail] = useState<string>(userData.user.email);

    const handleModif = (key: 'email', value: string) => {
        const newModif = { ...userData.user };
        newModif[key] = value;
        userData.setUser(newModif);
    };

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.access_token}`,
        },
        body: JSON.stringify({ email: `${mail}` }),
    };

    const updateMail = () =>
        fetch(`${BASE_URL}/users`, options)
            .then((response) => response.json())
            .catch((err) => console.error(err));

    return (
        <div className="m-2 border border-primary bg-info text-primary border-2 rounded rounded-4 px-4 pt-4  flex-grow-1 ">
            <div className="d-flex justify-content-between">
                <h1 className="mb-5">Profile :</h1>
                <span>
                    {userData.user.access_lvl > 2 && <AllComments />}
                    <UserComment />
                </span>
            </div>
            <p>
                <span className="bold">Pseudo</span> : {userData.user.pseudo}
            </p>
            <div className="d-flex align-center mb-5 flex-wrap align-items-end">
                <span className="bold">E-Mail </span> :{' '}
                {updating === false ? (
                    userData.user.email
                ) : (
                    <input
                        className=" form-control update-input mx-2"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        type="email"
                        required
                    ></input>
                )}{' '}
                {updating === true && (
                    <div className=" mt-2">
                        <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={() => {
                                handleModif('email', mail);
                                updateMail();
                                setUpdating(false);
                            }}
                        >
                            Modifier
                        </button>{' '}
                        <button
                            type="button"
                            className="btn btn-primary btn-sm text-dark"
                            onClick={() => setUpdating(false)}
                        >
                            Retour
                        </button>
                    </div>
                )}
            </div>
            <UpdateProfil setUpdating={setUpdating} />
        </div>
    );
}
