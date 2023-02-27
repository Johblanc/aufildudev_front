import { useRef, useState } from "react"


export function RegisterForm() {

    const [message, setMessage] = useState<string[]>([""])


    const pseudoRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passVerifRef = useRef<HTMLInputElement>(null);

    const submitHandler = () => {


        //console.log(pseudoRef?.current?.value, emailRef?.current?.value, passwordRef?.current?.value, passVerifRef?.current?.value);

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
            console.log(options);

            fetch('http://localhost:8000/api/users/register', options)
                .then(response => response.json())
                .then(data => {
                    if (data.data) {
                        console.log(data.data)
                        setMessage([data.message])
                        pseudoRef.current!.value = "";
                        emailRef.current!.value = "";
                        passwordRef.current!.value = "";
                        passVerifRef.current!.value = "";

                    }
                    else {
                        if (typeof data.message === "string") {
                            setMessage([data.message])
                        }
                        else {
                            setMessage(data.message)
                        }
                    }
                })

        }
        else {
            alert('informations manquantes')
        }
    }


    const displayMessages = message.map((item, i) => <p key={i}>{item}</p>)

    return (

        <div className="modal" id="registerModal" tabIndex={-1} >
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content login-color ">
                    <div className="modal-header">
                        <h5 className="modal-title">REGISTER</h5>
                        <button type="button" className="btn-close green-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body login-color">
                        <label htmlFor="exampleFormControlInput1" className="form-label">pseudo</label>
                        <input ref={pseudoRef} type="pseudo" className="form-control" name="pseudo" id="inputpseudo" placeholder="Pseudo"></input>

                        <br></br>

                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input ref={emailRef} type="email" className="form-control" id="inputEmailRegister" placeholder="@Email"></input>

                        <br></br>

                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input ref={passwordRef} type="password" className="form-control" id="inputPasswordRegister" placeholder="Password"></input>

                        <br></br>

                        <label htmlFor="inputPassword" className="form-label">Verify Password</label>
                        <input ref={passVerifRef} type="password" className="form-control" id="inputPasswordVerify" placeholder="Verify your password"></input>

                    </div>

                    <div className="modal-footer">
                        <div>{displayMessages}</div>

                        <button type="button" onClick={submitHandler} className="btn btn-green"> Valider</button>
                    </div>
                </div>
            </div>
        </div>
    )


}
