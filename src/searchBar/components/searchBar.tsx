import DropDown from "./dropdown";

export default function SearchBar() {

    return (
        <div className="container-fluid color-bg">
            <div className="row d-flex flex-row justify-content-between align-item-center">


                <div className="col-md-2 col-12">
                    <div className="form-floating ">
                        <input className="form-control form-control-sm" type="text" placeholder="Recherche Rapide" aria-label="search" />
                        <label htmlFor="floatingInput">Recherche rapide</label>
                    </div>
                </div>

                <div className="col-md-2 col-12">
                    <div className="form-floating ">
                        <input type="text" className="form-control form-control-sm " placeholder="Rechercher par Titre" aria-label="search" />
                        <label htmlFor="floatingInput">Recherche par Titre</label>
                    </div>
                </div>


                <div className="col-md-2 col-12">
                    <div className="form-floating ">
                        <input type="text" className="form-control form-control-sm " placeholder="Rechercher par Auteur" aria-label="search" />
                        <label htmlFor="floatingInput">Recherche par Auteur</label>
                    </div>
                </div>

                <div className="col-md-2 col-12">
                    <DropDown table={"categories"} />
                </div>

                <div className="col-md-2 col-12">
                    <DropDown table={"frameworks"} />
                </div>

                <div className="col-md-2 col-12">
                    <DropDown table={"languages"} />
                </div>

                
            </div>
            <div className="">
                    <button
                        type="button"
                        className="btn btn-green w-100"
                    >
                        {' '}
                        Rechercher
                    </button>

                </div>
        </div>






    )
}