import { useEffect, useState } from "react";
import { TArticleFull } from "../../Articles/Types/TArticleFull";
import { TSearchOption } from "../../Articles/Types/TSearchOption";
import { BASE_URL } from "../../constant/url";
import { TablesEnums } from "../types/tablesEnums";
import DropDown from "./dropdown";

export default function SearchBar(props: {
  setSearchOption: React.Dispatch<React.SetStateAction<TSearchOption>>
}) {
  //#region search

  //contient tout les articles publiques de la BDD
  const [allArticles, setAllArticles] = useState<TArticleFull[]>([]);

  //permet de recupérer les articles via un fetch
  useEffect(() => {
    fetch(`${BASE_URL}/articles`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);

        setAllArticles(data.data);
      });
  }, []);
  //recupére une liste pour chaques checkBox
  const [selections, setSelections] = useState({
    languages: [] as number[],
    frameworks: [] as number[],
    categories: [] as number[],
  });

  //copie l'ancienne selection de toutes les tables et on modifie la table qui nous interesse, et on sauvegarde de la table dans le state "selections"
  const handleSelections = (table: TablesEnums, value: number[]) => {
    const newSelection = { ...selections };
    newSelection[table] = value;
    setSelections(newSelection);
  };


  //recupere et contient les values entrées dans les inputs correspondant
  const [inputSearch, setInputSearch] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");

  //permet de lancer la recherche via le button, et lance le filtrage des parametres

  const handleResearch = () => {
    props.setSearchOption({
      languages: selections.languages,
      frameworks: selections.frameworks,
      categories: selections.categories,
      inputSearch: inputSearch.toLowerCase(),
      inputTitle: inputTitle.toLowerCase(),
      inputAuthor: inputAuthor.toLowerCase(),
    })
  }
  //#endregion


  return (
    <div className="container-fluid color-bg rounded-bottom ">
      <div className="row d-flex flex-row justify-content-between align-items-center py-3 ">

        <div className="col-md-2 col-12 mb-2 ">
          <div className="form-floating  ">
            <input
              className="form-control height-form "
              type="text"
              placeholder="Recherche Rapide"
              aria-label="search"
              onChange={(event) => setInputSearch(event.target.value)}
            />
            <label htmlFor="floatingInput" className="padding-label" >Recherche rapide</label>
          </div>
        </div>

        <div className="col-md-2 col-12 mb-2">
          <div className="form-floating ">
            <input
              type="text"
              className="form-control height-form "
              placeholder="Rechercher par Titre"
              aria-label="search"
              onChange={(event) => setInputTitle(event.target.value)}
            />
            <label htmlFor="floatingInput" className="padding-label">Recherche par Titre</label>
          </div>
        </div>

        <div className="col-md-2 col-12 mb-2">
          <div className="form-floating ">
            <input
              type="text"
              className="form-control height-form "
              placeholder="Rechercher par Auteur"
              aria-label="search"
              onChange={(event) => setInputAuthor(event.target.value)}
            />
            <label htmlFor="floatingInput" className="padding-label">Recherche par Auteur</label>
          </div>
        </div>

        <div className="col-md-2 col-12 mb-2">
          <DropDown
            table={TablesEnums.categories}
            defaultValue={[]}
            setValue={handleSelections}
          />
        </div>

        <div className="col-md-2 col-12 mb-2">
          <DropDown
            table={TablesEnums.frameworks}
            defaultValue={[]}
            setValue={handleSelections}
          />
        </div>

        <div className="col-md-2 col-12 mb-2">
          <DropDown
            table={TablesEnums.languages}
            defaultValue={[]}
            setValue={handleSelections}
          />
        </div>

        <div className="col-md-2 col-12">
          <button
            type="button"
            className="btn btn-green col-12 "
            onClick={handleResearch}
          >

            Lancer la Recherche
          </button>
        </div>
      </div>
      {/* {filterArticles.map(item=>item.title).join(", ")} */}
    </div>
  );
}
