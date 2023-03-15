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
import { DEFAULT_ARTICLE } from "../../Constant/DefaultArticle";

export function ArticleFull() {
  const { user } = useContext(UserContext);
  const { article, setArticle } = useContext(ArticleContext);

  const [inModif, setInModif] = useState(false);
  const [inDelete, setInDelete] = useState(false);

  const [currentModif, setCurrentModif] = useState({
    title: article.title,
    content: article.content,
  });

  const [selections, setSelections] = useState({
    languages: [] as number[],
    frameworks: [] as number[],
    categories: [] as number[],
    requirements: [] as number[],
  });

  const [messages, setMessages] = useState({
    title: "",
    content: "",
    languages: "",
    categories: "",
    copy: () => {
      return { ...messages };
    },
  });

  useEffect(() => {
    setInModif(false);
    if (article.id < 0) { 
      article.user_pseudo = user.pseudo ;
      setTimeout(() => setInModif(true), 1);
    }
  }, [article]);

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
  }, [inModif, article]);

  useEffect(() => {
    const newMessages = messages.copy();
    if (
      currentModif.title === "" ||
      currentModif.title === DEFAULT_ARTICLE.title
    ) {
      newMessages.title = "Le Titre n'est pas valide";
    } else {
      newMessages.title = "";
    }

    if ( currentModif.content === "" ) 
    {
      newMessages.content = "Il n'y a pas de contenu";
    } 
    else 
    {
      newMessages.content = "";
    }

    if ( selections.categories.length === 0 ) 
    {
      newMessages.categories = "Il faut au moins une catégorie";
    } 
    else 
    {
      newMessages.categories = "";
    }

    if ( selections.languages.length === 0 ) 
    {
      newMessages.languages = "Il faut au moins un langage";
    } 
    else 
    {
      newMessages.languages = "";
    }

    setMessages(newMessages);
  }, [currentModif, selections]);

  /** Récupération d'une modif du titre ou contenu */
  const handleModif = (key: "title" | "content", value: string) => {
    const newModif = { ...currentModif };
    newModif[key] = value;
    setCurrentModif(newModif);
  };

  /** Récupération d'une modif des prérequis, des langages, des catégories ou des frameworks */
  const handleSelections = (
    table: TablesEnums | "requirements",
    value: number[]
  ) => {
    const newSelection = { ...selections };
    newSelection[table] = value;
    setSelections(newSelection);
  };

  const handleSave = async () => {
    const newArticle = {
      title: currentModif.title,
      content: currentModif.content,
      languages: selections.languages,
      frameworks: selections.frameworks,
      categories: selections.categories,
      requirements: selections.requirements,
    };
    if (article.id === -1) {
      const res = await Requester.articleCreatePrivate(
        newArticle,
        user.access_token
      );
      if (res.statusCode === 409){
        const newMessage = messages.copy()
        newMessage.title = "Ce titre est déjà pris"
        setMessages(newMessage)
      }
      else {
        setArticle(res.data);
      }
    } else {
      const data = await Requester.articleUpdate(
        article.id,
        newArticle,
        user.access_token
      );
      setArticle(data.data);
    }
  };

  const isValid =
    messages.title === "" &&
    messages.content === "" &&
    messages.languages === "" &&
    messages.categories === "";



  enum BootStrap {
    ARTICLE = "m-2 border border-primary bg-info text-primary border-2 rounded rounded-4 p-4 flex-grow-1",
    BUTTON = "btn bg-secondary border border-1 border-dark text-primary m-1",
    DROPDOWN = "m-1 drop-resize",
    FLEX = "d-flex flex-wrap drop-resize",
    DROPDOWNS = "d-flex flex-wrap drop-resize order-md-0",
    COMMANDS = "d-flex flex-wrap drop-resize order-md-1 ms-auto",
  }

  return (
    <div className={BootStrap.ARTICLE}>
      {!isValid && inModif && (
        <div className="bg-success text-light border border-2 border-danger rounded">
          <p className="m-1"> {messages.title} </p>
          <p className="m-1"> {messages.content} </p>
          <p className="m-1"> {messages.categories} </p>
          <p className="m-1"> {messages.languages} </p>
        </div>
      )}
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
              {inModif && isValid && (
                <button className={BootStrap.BUTTON} onClick={handleSave}>
                  Enregistrer
                </button>
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
              {!inModif &&
                article.status === "submit" &&
                user.access_lvl > 2 && (
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
              defaultValue={currentModif.title}
              setter={(value) => handleModif("title", value)}
            />
          </span>
          <DropDownPublicArticles
            value={selections.requirements}
            setValue={(value) => handleSelections("requirements", value)}
            articleId={article.id}
          />

          <CustomMDEditor
            value={currentModif.content}
            setValue={(val: string | undefined) =>
              handleModif("content", val || "")
            }
          />
          <p>
            Par {article.user_pseudo} le{" "}
            {new Date(article.created_at).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
