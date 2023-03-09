import { useEffect, useState } from "react";
import { TArticleFull } from "../../Articles/Types/TArticleFull";
import { BASE_URL } from "../../constant/url";
import { TablesEnums } from "../types/tablesEnums";
import DropDown from "./dropdown";

export default function SearchBar() {

    const [allArticles, setAllArticles] = useState<TArticleFull[]>([])

    useEffect(() => {
        fetch(`${BASE_URL}/articles`)
            .then((response) =>
                response.json())
            .then((data) => {
                //console.log(data);

                setAllArticles(data.data)
            }
            )
    },[]
    )
    const [selections, setSelections] = useState({
        languages: [] as number[],
        frameworks: [] as number[],
        categories: [] as number[]
    })


    const handleSelections = (table: TablesEnums, value: number[]) => {
        const newSelection = { ...selections }
        newSelection[table] = value
        setSelections(newSelection)
    }
    //console.log(selections);
    



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
                    <DropDown table={TablesEnums.categories} defaultValue={[]} setValue={handleSelections} />
                </div>

                <div className="col-md-2 col-12 mb-2">
                    <DropDown table={TablesEnums.frameworks} defaultValue={[]}
                        setValue={handleSelections} />
                </div>

                <div className="col-md-2 col-12 mb-2">
                    <DropDown table={TablesEnums.languages} defaultValue={[]}
                        setValue={handleSelections} />
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