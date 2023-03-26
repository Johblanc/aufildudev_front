import { Titre } from '../../Titre/Titre';

export default function Accueil(props: {
    setPage: React.Dispatch<
        React.SetStateAction<'Article' | 'Profile' | 'Accueil' | 'Main'>
    >;
}) {
    return (
        <div className="banner d-flex flex-column justify-content-center align-items-center ">
            <div className="hero-content rounded">
                <Titre />
            </div>
            <button
                type="button"
                className="btn btn-primary text-dark mt-4"
                onClick={() => props.setPage('Article')}
            >
                Acceder aux articles !
            </button>
        </div>
    );
}
