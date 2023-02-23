import DropDown from "./dropdown";

export default function SearchBar() {

    return (

        <div className="row color-bg height rounded-2 rounded-top-0">
            <div className="btn-group justify-content-between align-items-center">


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
                    <DropDown table={"categories"} />
                </div>

                <div className="">
                    <DropDown table={"frameworks"} />
                </div>

                <div className="">
                    <DropDown table={"languages"} />
                </div>
            </div>
        </div>


    )
}