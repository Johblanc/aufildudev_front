import DropDown from "./dropdown";

export default function SearchBar() {





    return (
        <div className="container-fluid color-bg ">
            <div className="row d-flex flex-row justify-content-between align-items-center ">


                <div className="col-md-2 col-12 mb-2 ">
                    <div className="form-floating ">
                        <input className="form-control form-control-sm" type="text" placeholder="Recherche Rapide" aria-label="search" />
                        <label htmlFor="floatingInput">Recherche rapide</label>
                    </div>
                </div>

                <div className="col-md-2 col-12 mb-2">
                    <div className="form-floating ">
                        <input type="text" className="form-control form-control-sm " placeholder="Rechercher par Titre" aria-label="search" />
                        <label htmlFor="floatingInput">Recherche par Titre</label>
                    </div>
                </div>


                <div className="col-md-2 col-12 mb-2">
                    <div className="form-floating ">
                        <input type="text" className="form-control " placeholder="Rechercher par Auteur" aria-label="search" />
                        <label htmlFor="floatingInput">Recherche par Auteur</label>
                    </div>
                </div>

                <div className="col-md-2 col-12 mb-2">
                    <DropDown table={"categories"} defaultValue={[]} />
                </div>

                <div className="col-md-2 col-12 mb-2">
                    <DropDown table={"frameworks"} defaultValue={[]} />
                </div>

                <div className="col-md-2 col-12 mb-2">
                    <DropDown table={"languages"} defaultValue={[]} />
                </div>


            </div>
            <div className="w-md-100 w-50">
                <button
                    type="button"
                    className="btn btn-green mb-2"
                >
                    {' '}
                    Rechercher
                </button>

            </div>
        </div>






    )
}