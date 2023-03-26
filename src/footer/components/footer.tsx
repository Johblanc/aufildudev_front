import '../footer-style.css';

export default function Footer() {
    return (
        <footer>
            <div className="d-flex footer-fill-h bg-dark text-light justify-content-around pb-3 pt-2">
                <div className="d-flex flex-column">
                    <a
                        href="https://github.com/kevinbatard"
                        className="mb-2 git-link"
                    >
                        <i className="bi bi-github"></i> BATARD Kévin
                    </a>

                    <a
                        href="https://github.com/Johblanc "
                        className=" git-link"
                    >
                        <i className="bi bi-github"></i> BLANC Johann
                    </a>
                </div>
                <div className="d-flex flex-column">
                    <a
                        href="https://github.com/Wyllwyll"
                        className=" mb-2 git-link"
                    >
                        <i className="bi bi-github"></i> BOEUF Terry
                    </a>
                    <a
                        href="https://github.com/Captainbigleu"
                        className=" git-link"
                    >
                        <i className="bi bi-github"></i> FAVRE Jessie
                    </a>
                </div>
            </div>
        </footer>
    );
}
