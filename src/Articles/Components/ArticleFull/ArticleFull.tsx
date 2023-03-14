import { useContext, useEffect, useState } from "react";
import { EntryString } from "../../../Entries/Components/EntryString";
import DropDown from "../../../searchBar/components/dropdown";
import DropDownPublicArticles from "./DropdownPublicArticles";
import MDEditor from "@uiw/react-md-editor";
import { CustomMDEditor } from "../CustumMDEditor/CustomMDEditor";
import { TablesEnums } from "../../../searchBar/types/tablesEnums";
import { ArticleComments } from "../../../comments/components/articleComments/ArticleComments";
import { UserContext } from "../../../context/UserContext";
import { Requester } from "../../Types/requester";
import { ArticleContext } from "../../../context/ArticleContext";

export function ArticleFull() {
  const { user } = useContext(UserContext);
  const { article , setArticle } = useContext(ArticleContext);

  

  const [inModif, setInModif] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [currentModif, setCurrentModif] = useState({
    title: article.title ,
    content: article.content ,
  });

  const [selections, setSelections] = useState({
    languages: [] as number[],
    frameworks: [] as number[],
    categories: [] as number[],
    requirements: [] as number[],
  });

  const handleModif = (key: "title" | "content", value: string) => {
    const newModif = { ...currentModif };
    newModif[key] = value;
    setCurrentModif(newModif);
  };

  const handleSelections = (
    table: TablesEnums | "requirements",
    value: number[]
  ) => {
    const newSelection = { ...selections };
    newSelection[table] = value;
    setSelections(newSelection);
  };


  useEffect(() => {
    
      setCurrentModif({
        title: article.title,
        content: article.content,
      });
      setSelections({
        languages: article.languages.map((item) => item.id),
        frameworks: article.frameworks.map((item) => item.id),
        categories: article.categories.map((item) => item.id),
        requirements: article.requirements.map((item) => item.id),
      });
    if (article.id <0 ){
      setInModif(true)
    }
  }, [article, inModif]);

  const handleSave = async ()=> {
    const newArticle = {
      title : currentModif.title ,
      content : currentModif.content ,
      languages : selections.languages ,
      frameworks : selections.frameworks ,
      categories : selections.categories ,
      requirements : selections.requirements ,
    } ;
    const data = await Requester.articleUpdate(article.id,newArticle,user.access_token)
    setArticle(data)

    
  }


  enum BootStrap {
    ARTICLE = "m-2 border border-primary bg-info text-dark border-2 rounded rounded-4 p-4 flex-grow-1",
    BUTTON = "btn bg-secondary border border-1 border-dark text-light m-1",
    DROPDOWN = "m-1 drop-resize",
    FLEX = "d-flex flex-wrap drop-resize",
    DROPDOWNS = "d-flex flex-wrap drop-resize order-md-0",
    COMMANDS = "d-flex flex-wrap drop-resize order-md-1 ms-auto"
  }

  return (
    <div className={BootStrap.ARTICLE}>
      <div>
        <span className={BootStrap.FLEX}>
          {user.pseudo === article.user_pseudo && (
            <span className={BootStrap.COMMANDS}>
              {article.id !== -1 && (
                <button
                  onClick={() => setInModif(!inModif)}
                  className={BootStrap.BUTTON}
                >
                  {inModif ? "Annuler" : "Modifier"}
                </button>
              )}
              {inModif && (
                <button className={BootStrap.BUTTON} onClick={handleSave}>Enregistrer</button>
              )}
              {!inModif && article.status === "private" && (
                <button className={BootStrap.BUTTON}>
                  Demande de publication
                </button>
              )}
              {!inModif && (
                <span onMouseLeave={() => setInDelete(false)}>
                  <button
                    onClick={() => setInDelete(true)}
                    className={BootStrap.BUTTON}
                  >
                    Supprimer
                  </button>
                  {inDelete && (
                    <button className={BootStrap.BUTTON}>
                      Valider la suppression
                    </button>
                  )}
                </span>
              )}
              {!inModif && article.status === "submit" && user.access_lvl > 2 && (
                <button className={BootStrap.BUTTON}>Publier</button>
              )}
            </span>
          )}
          {inModif && (
            <span className={BootStrap.DROPDOWNS}>
              <span className={BootStrap.DROPDOWN}>
                <DropDown
                  table={TablesEnums.categories}
                  defaultValue={selections.categories}
                  setValue={handleSelections}
                />
              </span>
              <span className={BootStrap.DROPDOWN}>
                <DropDown
                  table={TablesEnums.languages}
                  defaultValue={selections.languages}
                  setValue={handleSelections}
                />
              </span>
              <span className={BootStrap.DROPDOWN}>
                <DropDown
                  table={TablesEnums.frameworks}
                  defaultValue={selections.frameworks}
                  setValue={handleSelections}
                />
              </span>
            </span>
          )}
        </span>
      </div>
      {!inModif && (
        <div>
          <h3>{article.title}</h3>
          <p>
            Prérequis :{" "}
            {article.requirements.map((item) => item.title).join(", ")}
          </p>
          <p>
            Langages : {article.languages.map((item) => item.name).join(", ")}
          </p>
          <p>
            FrameWorks :{" "}
            {article.frameworks.map((item) => item.name).join(", ")}
          </p>
          <p>
            Catégorie : {article.categories.map((item) => item.name).join(", ")}
          </p>
          <MDEditor.Markdown
            source={article.content}
            style={{ whiteSpace: "pre-wrap" }}
          />
          <p>
            Par {article.user_pseudo} le{" "}
            {new Date(article.created_at).toLocaleDateString()}
          </p>
          <p>
            voir ensuite :{" "}
            {article.needed_for.map((item) => item.title).join(", ")}
          </p>

          {/*A destination de l'article*/}
          <ArticleComments articleId={article.id} />
        </div>
      )}

      {inModif && (
        <div>
          <span className="m-1">
            <EntryString
              name={"Titre"}
              defaultValue={article.title}
              setter={(value) => handleModif("title", value)}
            />
          </span>
          <DropDownPublicArticles
            value={selections.requirements}
            setValue={(value) => handleSelections("requirements", value)}
            articleId={article.id}
          />

          <CustomMDEditor value={currentModif.content} setValue={(val:string | undefined)=>handleModif("content",val || "")} />
          <p>
            Par {article.user_pseudo} le{" "}
            {new Date(article.created_at).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
