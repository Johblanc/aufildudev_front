
export function Navbar() {



    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary nav-back ">
            <div className="container-fluid">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button type="button" className="btn btn-green">Ajouter un Article</button>
                    </li>
                </ul>

                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse flex-row-reverse no-wrap" id="navbarNav">

                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn btn-green"> Connexion</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#registerModal" className="btn btn-green"> Register</button>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}