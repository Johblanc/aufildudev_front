import { useContext, useState } from 'react';
import { BASE_URL } from '../../constant/url';
import { UserContext } from '../../context/UserContext';
import { TUser } from '../../navbar/types/TUser';

export default function User(props: { data: TUser }) {
    const userData = useContext(UserContext);
    const [lvl, setLvl] = useState<number>(props.data.access_lvl);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.access_token}`,
        },
        body: `{"access_lvl":${lvl}}`,
    };

    const update = () =>
        fetch(
            `${BASE_URL}/users/promote/${props.data.id}`,
            options
        )
            .then((response) => response.json())
            .catch((err) => console.error(err));

    return (
        <div className="d-flex flex-column">
            <p className="bold">{props.data.pseudo} :</p>
            <p>
                {' '}
                E-Mail : <span className="bold">{props.data.email}</span>
            </p>
            <p>
                {' '}
                Niveau d'accès :{' '}
                <div>
                    {isUpdating === false ? (
                        <span className="bold">{lvl}</span>
                    ) : (
                        <input
                            className="form-control"
                            type="number"
                            value={lvl}
                            onChange={(e) => setLvl(parseInt(e.target.value))}
                        ></input>
                    )}
                </div>
            </p>

            <div className="d-flex justify-content-center">
                {isUpdating === false ? (
                    <button
                        type="button"
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                            setIsUpdating(true);
                        }}
                    >
                        Promouvoir
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => {
                                update();
                                setIsUpdating(false);
                            }}
                        >
                            Valider
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm "
                            onClick={() => {
                                setIsUpdating(false);
                            }}
                        >
                            Retour
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
