export default function SearchBar() {

    return (

        <div className="row d-flex flex-row border border-3 rounded rounded-3">
            <div className="btn-group">

                <div className="">
                    <input type="text" className="form-control" placeholder="Recherche Rapide" aria-label="search" />
                </div>

                <div className="">
                    <input type="text" className="form-control" placeholder="Rechercher par Titre" aria-label="search" />
                </div>

                <div className="">
                    <input type="text" className="form-control" placeholder="Rechercher par Auteur" aria-label="search" />
                </div>


            </div>
        </div>

    )
}