import { useEffect, useState } from "react";
import { TArticleFull } from "../../Articles/Types/TArticleFull";
import { BASE_URL } from "../../constant/url";
import { TablesEnums } from "../types/tablesEnums";
import DropDown from "./dropdown";

export default function SearchBar() {
  //#region search-dropdown
  
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
  //console.log(selections);

  //recupere et contient les values entrées dans les inputs correspondant
  const [inputSearch, setInputSearch] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");

  //permet de lancer la recherche via le button, et lance le filtrage des parametres
  const [filterArticles, setFilterArticles] = useState(allArticles);
  const handleResearch = () => {
    const newArticles = allArticles.filter((article) => {
      const isincludeArray = (target: number[], include: number[]) => {
        //include=selection de l'utilisateur && target=ID de chaques articles
        let result = true; //par defaut il est inclus et on va s'assurer que c'est vrai(permet de renvoyer une liste d'article si aucun filtre n'est actif car true d'origine)
        include.forEach((item) => {
          //on verifie chaque element de la selection, et on regarde (oui/non) si il se trouve à l'interieur de l'article
          result = result && target.includes(item); //SI item inclus dans target alors result=true
        });
        return result;
      };

      //permet de recupérer l'ID de chacuns et de la stocker
      const categoriesId = article.categories.map((elm) => elm.id);
      const languagesId = article.languages.map((elm) => elm.id);
      const frameworksId = article.frameworks.map((elm) => elm.id);

      //conditions de resultat pour chaques filtres
      return (
        (article.title.includes(inputSearch.toLowerCase()) ||
          article.user_pseudo.includes(inputSearch.toLowerCase()) ||
          article.content.includes(inputSearch.toLowerCase())) &&
        article.title.includes(inputTitle.toLowerCase()) &&
        article.user_pseudo.includes(inputAuthor.toLowerCase()) &&
        isincludeArray(categoriesId, selections.categories) &&
        isincludeArray(languagesId, selections.languages) &&
        isincludeArray(frameworksId, selections.frameworks)
      );
    });
    setFilterArticles(newArticles);
  };
  //#endregion


  return (
    <div className="container-fluid color-bg ">
      <div className="row d-flex flex-row justify-content-between align-items-center ">
        <div className="col-md-2 col-12 mb-2 ">
          <div className="form-floating ">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Recherche Rapide"
              aria-label="search"
              onChange={(event) => setInputSearch(event.target.value)}
            />
            <label htmlFor="floatingInput">Recherche rapide</label>
          </div>
        </div>

        <div className="col-md-2 col-12 mb-2">
          <div className="form-floating ">
            <input
              type="text"
              className="form-control form-control-sm "
              placeholder="Rechercher par Titre"
              aria-label="search"
              onChange={(event) => setInputTitle(event.target.value)}
            />
            <label htmlFor="floatingInput">Recherche par Titre</label>
          </div>
        </div>

        <div className="col-md-2 col-12 mb-2">
          <div className="form-floating ">
            <input
              type="text"
              className="form-control "
              placeholder="Rechercher par Auteur"
              aria-label="search"
              onChange={(event) => setInputAuthor(event.target.value)}
            />
            <label htmlFor="floatingInput">Recherche par Auteur</label>
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
      </div>
      <div className="w-md-100 w-50">
        <button
          type="button"
          className="btn btn-green mb-2"
          onClick={handleResearch}
        >
          {" "}
          Rechercher
        </button>
      </div>
      {/* {filterArticles.map(item=>item.title).join(", ")} */}
    </div>
  );
}
