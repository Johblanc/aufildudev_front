export function ModalUpdate() {
    return (
        <div>
            <div
                className="modal fade"
                id="updateComment"
                aria-hidden="true"
                aria-labelledby="updateComment"
                tabIndex={10}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content size">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateComment">
                                Modification
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="form-floating modal-body">
                            <textarea
                                className="form-control"
                                placeholder="Modifie ton commentaire ici"
                                id="floatingTextarea2"
                                style={{ height: 100 }}
                            ></textarea>
                            <label className="p-4" htmlFor="floatingTextarea">
                                Comments :
                            </label>
                            <div className="text-center">
                                <button
                                    className="btn btn-primary mt-2"
                                    data-bs-target="#commentList"
                                    data-bs-toggle="modal"
                                >
                                    Envoyer
                                </button>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                data-bs-target="#commentList"
                                data-bs-toggle="modal"
                            >
                                Retour
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
