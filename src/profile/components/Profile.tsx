import { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import BtnAdmin from '../../Admin/components/BtnAdmin';

import { AllComments } from '../../comments/components/allComments/AllComments';
import { UserComment } from '../../comments/components/userComment/UserComment';
import { BASE_URL } from '../../constant/url';
import { UserContext } from '../../context/UserContext';
import '../style/profile-style.css';
import UpdateProfil from './UpdateProfile';

export function Profile(props: {
    page: 'Article' | 'Profile' | 'Accueil' | 'Admin';
    setPage: React.Dispatch<
        React.SetStateAction<'Article' | 'Profile' | 'Accueil' | 'Admin'>
    >;
}) {
    const userData = useContext(UserContext);
    const [updating, setUpdating] = useState<boolean>(false);
    const [mail, setMail] = useState<string>(userData.user.email);

    const notifySuccess = (msg: string) =>
        toast.success(msg, {
            position: 'bottom-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
        });
    const notifyError = (msg: string) =>
        toast.error(msg, {
            position: 'bottom-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
        });

    const handleModif = (key: 'email', value: string) => {
        const newModif = { ...userData.user };
        newModif[key] = value;
        userData.setUser(newModif);
    };

    function checkEmail(email: string) {
        var re =
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function validate() {
        if (checkEmail(mail)) {
            notifySuccess('Email modifié!');
            return true;
        } else {
            notifyError('Veuillez entrer un mail valide');
            return false;
        }
    }

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.access_token}`,
        },
        body: JSON.stringify({ email: `${mail}` }),
    };

    const updateMail = () =>
        fetch(`${BASE_URL}/users`, options).then((response) => response.json());

    return (
        <div className="m-2 border border-primary bg-info text-primary border-2 rounded rounded-4 px-4 pt-4  flex-grow-1 ">
            <div className="d-flex justify-content-between">
                <h1 className="mb-5">Profile :</h1>
                <span>
                    {userData.user.access_lvl === 3 && (
                        <AllComments page={props.page} />
                    )}
                    {userData.user.access_lvl === 4 && (
                        <BtnAdmin setPage={props.setPage} />
                    )}
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
                        id="email"
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
                            type="submit"
                            className="btn btn-success btn-sm"
                            onClick={() => {
                                if (validate() === true) {
                                    updateMail();
                                    handleModif('email', mail);
                                    setUpdating(false);
                                }
                                return;
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
            <div>
                <ToastContainer />
            </div>
        </div>
    );
}
