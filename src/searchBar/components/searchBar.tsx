import DropDown from "./dropdown";

export default function SearchBar() {

    return (

        <div className="row d-flex flex-row border border-3 rounded rounded-3">
            <div className="btn-group col-md-10 col-12">

                <div className="">
                    <input type="text" className="form-control" placeholder="Recherche Rapide" aria-label="search" />
                </div>

                <div className="">
                    <input type="text" className="form-control" placeholder="Rechercher par Titre" aria-label="search" />
                </div>

                <div className="">
                    <input type="text" className="form-control" placeholder="Rechercher par Auteur" aria-label="search" />
                </div>

                <div className="">
                    <DropDown table={"Categories"} />
                </div>

                <div className="">
                    <DropDown table={"Frameworks"}  />
                </div>

                <div className="">
                    <DropDown table={"Languages"} />
                </div>

            </div>
        </div>

    )
}