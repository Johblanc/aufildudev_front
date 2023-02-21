

const LoginForm = (props: { isShowLogin: boolean }) => {

    return (
        <div className={`${!props.isShowLogin ? "active" : ""}show`}>
            <div className=" row login-form ">
                <div className="form-box solid d-flex flex-column flex-sm-row col-10 col-md-4">

                    <form className="mx-3 py-3">
                        <h1 className="login-text">Sign In</h1>
                        <label>Pseudo</label><br></br>
                        <input
                            type="text"
                            name="pseudo"
                            className="login-box"
                        /><br></br>
                        <label>Password</label><br></br>
                        <input
                            type="password"
                            name="password"
                            className="login-box"
                        /><br></br>
                        <button type="button" className="btn btn-green w-100 "> Login</button>
                    </form>


                    <div className="border border-3"></div>


                    <form className="mx-3 py-3">
                        <h1 className="login-text">Register</h1>
                        <label>Pseudo</label><br></br>
                        <input
                            type="text"
                            name="pseudo"
                            className="login-box"
                        /><br></br>
                        <label>Email</label><br></br>
                        <input
                            type="text"
                            name="email"
                            className="login-box"
                        /><br></br>
                        <label>Password</label><br></br>
                        <input
                            type="password"
                            name="password"
                            className="login-box"
                        /><br></br>
                        <label>Verif Password</label><br></br>
                        <input
                            type="password"
                            name="verif password"
                            className="login-box"
                        /><br></br>
                        <div className="d-grid d-md-block">
                            <button type="button" className="btn btn-green"> Register</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>



    )
}


export default LoginForm;
