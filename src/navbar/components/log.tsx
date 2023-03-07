import { useContext, useRef, useState } from 'react';
import { BASE_URL } from '../../constant/url';
import { UserContext } from '../../context/UserContext';

export function LoginForm(/* props: {
    setUser: React.Dispatch<React.SetStateAction<TUser>>;
} */) {
    const [message, setMessage] = useState<string[]>(['']);
    const pseudoRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { setUser } = useContext(UserContext);

    const submitHandler = () => {
        if (pseudoRef.current?.value && passwordRef.current?.value) {
            const body = {
                pseudo: pseudoRef.current.value,
                password: passwordRef.current.value,
            };

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            };

            console.log(options);

            fetch(`${BASE_URL}/auth/login`, options)
                .then((response) => response.json())

                .then((data) => {
                    if (data.data) {
                        setMessage([data.message]);
                        pseudoRef.current!.value = '';
                        passwordRef.current!.value = '';
                        setUser(data.data);
                    } else {
                        if (typeof data.message === 'string') {
                            setMessage([data.message]);
                        } else {
                            setMessage(data.message);
                        }
                    }
                });
        } else {
            alert('informations manquantes');
        }
    };

    const displayMessages = message.map((item, i) => <p key={i}>{item}</p>);
    return (
        <div className="modal" id="loginModal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content login-color ">
                    <div className="modal-header">
                        <h5 className="modal-title">LOGIN</h5>
                        <button
                            type="button"
                            className="btn-close green-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body login-color">
                        <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                        >
                            Identifiant
                        </label>
                        <input
                            ref={pseudoRef}
                            type="pseudo"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Pseudo"
                        ></input>
                        <br></br>
                        <label htmlFor="inputPassword" className="form-label">
                            Password
                        </label>
                        <input
                            ref={passwordRef}
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="password"
                        ></input>
                    </div>

                    <div className="modal-footer">
                        <div>{displayMessages}</div>
                        <button
                            onClick={submitHandler}
                            type="button"
                            className="btn btn-green"
                        >
                            {' '}
                            Connexion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
