import { Titre } from "../../Titre/Titre";

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg nav-back width">
                
                <Titre/>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse flex-row-reverse no-wrap"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item my-1 my-md-0">
                            <a className="nav-link active btn btn-green"

                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#loginModal"
                            >
                                {' '}
                                Connexion
                            </a>
                        </li>
                        <li className="nav-item  my-1 my-md-0">
                            <a className="nav-link active btn btn-green"

                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#registerModal"
                            >
                                {' '}
                                Register
                            </a>
                        </li>
                        <li className="nav-item  my-1 my-md-0">
                            <a className="nav-link active btn btn-green"
                                type="button">
                                Ajouter un Article
                            </a>
                        </li>
                    </ul>
                </div>
            
        </nav >
    );
}
