export function RegisterForm() {

    return (

        <div className="modal" id="registerModal" tabIndex={-1} >
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content login-color ">
                    <div className="modal-header">
                        <h5 className="modal-title">REGISTER</h5>
                        <button type="button" className="btn-close green-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="exampleFormControlInput1" className="form-label">pseudo</label>
                        <input type="identifiant" className="form-control" id="inputpseudo" placeholder="Pseudo"></input>
                        <br></br>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="@Email"></input>
                        <br></br>
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
                        <br></br>
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="verifyPassword" className="form-control" id="inputPasswordVerify" placeholder="Verify your password"></input>
                    </div>

                    <div className="modal-footer">
                        <button type="button" data-bs-toggle="modal" className="btn btn-green"> Valider</button>
                    </div>
                </div>
            </div>
        </div>
    )
}