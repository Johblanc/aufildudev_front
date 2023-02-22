

export function LoginForm() {

    return (

        <div className="modal" id="loginModal" tabIndex={-1} >
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content login-color ">
                    <div className="modal-header">
                        <h5 className="modal-title">LOGIN</h5>
                        <button type="button" className="btn-close green-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Identifiant</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Pseudo"></input>
                        <br></br>
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="password"></input>
                    </div>

                    {/*     <div className="modal-footer">
                        
                    </div> */}
                </div>
            </div>
        </div>
    )
}







