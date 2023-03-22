export default function UpdateProfil(props: {
    setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <button
            type="button"
            className="btn btn-primary text-dark w-100 mb-3"
            onClick={() => props.setUpdating(true)}
        >
            Modifier les informations
        </button>
    );
}
