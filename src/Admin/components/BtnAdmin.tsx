export default function BtnAdmin(props: {
    setPage: React.Dispatch<
        React.SetStateAction<'Article' | 'Profile' | 'Accueil' | 'Admin'>
    >;
}) {
    return (
        <button
            type="button"
            className="btn btn-primary text-dark w-100 mb-3"
            onClick={() => props.setPage('Admin')}
        >
            Admin
        </button>
    );
}
