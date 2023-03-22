import { useContext } from "react";
import { DEFAULT_ARTICLE } from "../../Articles/Constant/DefaultArticle";
import { ArticleContext } from "../../context/ArticleContext";
import { UserContext } from "../../context/UserContext";
import { Titre } from "../../Titre/Titre";

export function Navbar() {
    const { setArticle } = useContext(ArticleContext);
    const userData = useContext(UserContext);


    return (
        <nav className="navbar navbar-expand-lg nav-back width">
            <div className="m-3">
                <Titre />
            </div>
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
                className="collapse navbar-collapse flex-row-reverse no-wrap "
                id="navbarNav"
            >
                <ul className="navbar-nav ">
                    {userData.user.access_lvl < 1 ? (
                        <><li className="nav-item my-1 my-md-0">

                            <a href="/#" className="nav-link active btn btn-green mx-1"

                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#loginModal"
                                id="loginButton"
                            >
                                {' '}
                                Login
                            </a>
                        </li>

                            <li className="nav-item my-1 my-md-0">
                                <a href="/#" className="nav-link active btn btn-green mx-3"

                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#registerModal"
                                    id="registerButton"
                                >
                                    {' '}
                                    Register
                                </a>
                            </li></>
                    ) : (
                        ''
                    )}

                    {userData.user.access_lvl > 0 ? (
                        <li className="nav-item  my-1 my-md-0" onClick={() => setArticle(DEFAULT_ARTICLE)}>
                            <a href="/#" className="nav-link active btn btn-green mx-3"
                                type="button" >
                                Ajouter un Article
                            </a>
                        </li>
                    ) : (
                        ''
                    )}

                    {userData.user.access_lvl > 0 ? (
                        <li className="nav-item my-1 my-md-0">
                            <a href="/#" className="nav-link active btn btn-green mx-3"
                                type="button">
                                Profil
                            </a>
                        </li>
                    ) : (
                        ''
                    )}
                </ul>
            </div>

        </nav >
    );
}
