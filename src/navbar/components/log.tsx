import { useContext, useRef, useState } from 'react';
import { BASE_URL } from '../../constant/url';
import { UserContext } from '../../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginForm(/* props: {
    setUser: React.Dispatch<React.SetStateAction<TUser>>;
} */) {
    const [message, setMessage] = useState<string[]>(['']);
    const pseudoRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { setUser } = useContext(UserContext);
    const userData = useContext(UserContext);
    const notifySuccess = (msg: string,) => toast.success(msg,
        {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    ;
    const notifyError = (msg: string,) => toast.error(msg,
        {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    ;






    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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

            fetch(`${BASE_URL}/auth/login`, options)
                .then((response) => response.json())

                .then((data) => {
                    console.log(data);
                    if (data.data) {
                        setMessage([data.message]);
                        pseudoRef.current!.value = '';
                        passwordRef.current!.value = '';
                        setUser(data.data);
                        setTimeout(() => {
                            document.getElementById("close")?.click();
                        }, 1500);
                        notifySuccess(data.message)

                    } else {
                        if (typeof data.message === 'string') {
                            notifyError(data.message);
                        } else {
                            notifyError(data.message[0]);
                            data.message.forEach((element: string) => {
                                notifyError(element)
                            });
                        }
                    }
                });
        } else {
            notifyError('informations manquantes');
        }
    };




    return (
        <>

            <div className="modal fade" aria-labelledby='loginModal' id="loginModal" tabIndex={-1}>

                <div className="modal-dialog modal-dialog-centered  ">
                    <div className=" modal-content modal-content-login login-color ">
                        <div className="modal-header">
                            <h5 className="modal-title">LOGIN</h5>
                            <button
                                type="button"
                                className="btn-close green-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="close"
                            ></button>
                        </div>
                        <form onSubmit={submitHandler}>
                            <div className="modal-body login-color">
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                >
                                    Identifiant
                                </label>
                                <p>
                                    <input
                                        ref={pseudoRef}
                                        type="pseudo"
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="Pseudo"
                                    ></input>
                                </p>


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

                            <div className="modal-footer d-flex justify-content-center">
                                {userData.user.access_lvl < 1 ? (
                                    <>
                                        <button

                                            type="submit"
                                            className="btn btn-green"
                                        >
                                            {' '}
                                            Connexion
                                        </button></>
                                ) : (
                                    ''
                                )}
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            <div>
                <ToastContainer />
            </div>

        </>
    );
}

