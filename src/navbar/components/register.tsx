import { useRef, useState } from "react"
import { toast } from "react-toastify";
import { BASE_URL } from "../../constant/url";



export function RegisterForm() {

    const [message, setMessage] = useState<string[]>([""])


    const pseudoRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passVerifRef = useRef<HTMLInputElement>(null);
    const notifySuccess = (msg: string,) => toast.success(msg,
        {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
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



    const submitHandler = () => {

        if (
            pseudoRef.current?.value &&
            emailRef.current?.value &&
            passwordRef.current?.value &&
            passVerifRef.current?.value &&
            passwordRef.current?.value === passVerifRef.current?.value
        ) {

            const body = JSON.stringify({
                pseudo: pseudoRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                passwordVerify: passVerifRef.current.value
            });



            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
            };

            fetch(`${BASE_URL}/users/register`, options)
                .then(response => response.json())
                .then(data => {
                    if (data.data) {
                        setMessage([data.message])
                        pseudoRef.current!.value = "";
                        emailRef.current!.value = "";
                        passwordRef.current!.value = "";
                        passVerifRef.current!.value = "";
                        setTimeout(() => {
                            document.getElementById("loginButton")?.click();
                        }, 1500);
                        notifySuccess(data.message)


                    }
                    else {
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

        }
        else {
            notifyError('informations manquantes')
        }
    }

    return (

        <div className="modal fade" id="registerModal" tabIndex={-1} >
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content modal-content-register login-color ">
                    <div className="modal-header">
                        <h5 className="modal-title">REGISTER</h5>
                        <button type="button" className="btn-close green-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body login-color">
                        <p>
                            <label htmlFor="exampleFormControlInput1" className="form-label">pseudo</label>
                            <input ref={pseudoRef} type="pseudo" className="form-control" name="pseudo" id="inputpseudo" placeholder="Pseudo"></input>
                        </p>

                        <p>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                            <input ref={emailRef} type="email" className="form-control" id="inputEmailRegister" placeholder="@Email"></input>
                        </p>

                        <p>
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input ref={passwordRef} type="password" className="form-control" id="inputPasswordRegister" placeholder="Password"></input>
                        </p>

                        <p>
                            <label htmlFor="inputPassword" className="form-label">Verify Password</label>
                            <input ref={passVerifRef} type="password" className="form-control" id="inputPasswordVerify" placeholder="Verify your password"></input>
                        </p>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={submitHandler} className="btn btn-green"> Valider</button>
                    </div>
                </div>
            </div>
        </div>
    )


}
