import { useContext, useEffect, useState } from "react";
import { EntryString } from "../../Entries/Components/EntryString";
import DropDown from "../../searchBar/components/dropdown";
import { DEFAULT_ARTICLE } from "../Constant/DefaultArticle";
import { TArticleFull } from "../Types/TArticleFull";
import MDEditor from "@uiw/react-md-editor";
import { CustomMDEditor } from "./CustumMDEditor/CustomMDEditor";
import { TablesEnums } from "../../searchBar/types/tablesEnums";
import { ArticleComments } from "../../comments/components/articleComments/ArticleComments";
import { BASE_URL } from "../../constant/url";
import { UserContext } from "../../context/UserContext";
import DropDownPublicArticles from "./ArticleFull/DropdownPublicArticles";

export function ArticleFull(props: { id: number }) {
  const { id } = props;
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState<TArticleFull>(DEFAULT_ARTICLE);

  const [value, setValue] = useState<string | undefined>(article.content);

  const [inModif, setInModif] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [currentModif, setCurrentModif] = useState({
    title: "",
    content: "",
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
    if (id !== -1) {
      fetch(`${BASE_URL}/articles/public/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setArticle(data.data);
          setInModif(false);
        });
    } else {
      setArticle(DEFAULT_ARTICLE);
      setInModif(true);
    }
  }, [id]);

  useEffect(() => {
    if (!inModif) {
      setValue(article.content);
      setSelections({
        languages: article.languages.map((item) => item.id),
        frameworks: article.frameworks.map((item) => item.id),
        categories: article.categories.map((item) => item.id),
        requirements: article.requirements.map((item) => item.id),
      });
    }
  }, [article, inModif]);

  enum BootStrap {
    ARTICLE = "m-2 border border-primary bg-info text-dark border-2 rounded rounded-4 p-4 col-9" ,
    BUTTON = "btn bg-secondary border border-1 border-dark text-light m-1"
  }

  return (
    <div className={BootStrap.ARTICLE} >
      <div>
        <span>
          {user.pseudo === article.user_pseudo && (
            <span>
              {id !== -1 && <button onClick={() => setInModif(!inModif)} className={BootStrap.BUTTON}>
                {inModif ? "Annuler" : "Modifier"}
              </button>}
              {inModif && <button className={BootStrap.BUTTON}>Enregistrer</button>}
              {!inModif && article.status === "private" && (
                <button className={BootStrap.BUTTON}>Demande de publication</button>
              )}
              {!inModif && (
                <span onMouseLeave={() => setInDelete(false)}>
                  <button onClick={() => setInDelete(true)} className={BootStrap.BUTTON}>Supprimer</button>
                  {inDelete && <button className={BootStrap.BUTTON}>Valider la suppression</button>}
                </span>
              )}
            </span>
          )}
          {!inModif && article.status === "submit" && user.access_lvl > 2 && (
            <button className={BootStrap.BUTTON}>Publier</button>
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
            source={value}
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
          <span>
            <EntryString
              name={"Titre"}
              defaultValue={article.title}
              setter={(value) => handleModif("title", value)}
            />

            <span>
              <DropDown
                table={TablesEnums.categories}
                defaultValue={selections.categories}
                setValue={handleSelections}
              />
            </span>
            <span>
              <DropDown
                table={TablesEnums.languages}
                defaultValue={selections.languages}
                setValue={handleSelections}
              />
            </span>
            <span>
              <DropDown
                table={TablesEnums.frameworks}
                defaultValue={selections.frameworks}
                setValue={handleSelections}
              />
            </span>
          </span>
          <DropDownPublicArticles
            value={selections.requirements}
            setValue={(value: number[]) => handleSelections("requirements", value)}
            articleId={article.id}
          />

          <CustomMDEditor value={value} setValue={setValue} />
          <p>
            Par {article.user_pseudo} le{" "}
            {new Date(article.created_at).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
