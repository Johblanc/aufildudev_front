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
import { TArticleFull } from "../../Types/TArticleFull";
import { TResponse } from "../../Types/TResponse";

export function ArticleFull() {
  const { user } = useContext(UserContext);
  const { article, setArticle, setArticlesHandle } = useContext(ArticleContext);

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
      article.user_pseudo = user.pseudo;
      setTimeout(() => setInModif(true), 1);
    }
  }, [article,user]);

  useEffect(() => {
    setInDelete(false)
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
    let hasChange = false

    if (
      currentModif.title === "" ||
      currentModif.title === DEFAULT_ARTICLE.title
    ) {
      newMessages.title = "Le Titre n'est pas valide";
    } else {
      newMessages.title = "";
    }
    hasChange = hasChange || newMessages.title !== messages.title

    if (currentModif.content === "") {
      newMessages.content = "Il n'y a pas de contenu";
    } else {
      newMessages.content = "";
    }
    hasChange = hasChange || newMessages.content !== messages.content

    if (selections.categories.length === 0) {
      newMessages.categories = "Il faut au moins une catégorie";
    } else {
      newMessages.categories = "";
    }
    hasChange = hasChange || newMessages.categories !== messages.categories

    if (selections.languages.length === 0) {
      newMessages.languages = "Il faut au moins un langage";
    } else {
      newMessages.languages = "";
    }
    hasChange = hasChange || newMessages.languages !== messages.languages

    hasChange && setMessages(newMessages);
  }, 
  [currentModif, selections, messages]
  );

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

    let res: TResponse<TArticleFull>;
    let command: "update" | "add" = "update";

    // Pour un nouvelle article
    if (article.id === -1) {
      res = await Requester.articleCreatePrivate(newArticle, user.access_token);
      command = "add";
    } // Pour update un article existant
    else {
      res = await Requester.articleUpdate(
        article.id,
        newArticle,
        user.access_token
      );
    }
    if (res.statusCode === 409) {
      const newMessage = messages.copy();
      newMessage.title = "Ce titre est déjà pris";
      setMessages(newMessage);
    } else {
      setArticle(res.data);
      setArticlesHandle({ command: command, article: res.data });
      return res.data
    }
  };

  const handlePublicSave = async () => {
    const newArticle = await handleSave()
    Promise.all([newArticle]);
    if (newArticle){
      const res = await Requester.articleValidate(newArticle.id, user.access_token);
      setArticlesHandle({ command: "update", article: res });
    }
  };

  const handleDelete = async () => {
    const res = await Requester.articleDelete(article.id, user.access_token);
    res.id = article.id;
    setArticlesHandle({ command: "sup", article: res });
  };

  const handleSubmit = async () => {
    const res = await Requester.articleSubmit(article.id, user.access_token);
    res.id = article.id;
    setArticlesHandle({ command: "update", article: res });
  };

  const handleValidate = async () => {
    const res = await Requester.articleValidate(article.id, user.access_token);
    res.id = article.id;
    setArticlesHandle({ command: "update", article: res });
  };

  enum BootStrap {
    ARTICLE = "m-2 border border-primary bg-info text-primary border-2 rounded rounded-4 p-4 flex-grow-1",
    BUTTON = "btn bg-secondary border border-1 border-dark text-primary m-1",
    BAD_BUTTON = "btn bg-light border border-1 border-danger text-primary m-1",
    DROPDOWN = "m-1 drop-resize",
    FLEX = "d-flex flex-wrap drop-resize",
    DROPDOWNS = "d-flex flex-wrap drop-resize order-md-0",
    COMMANDS = "d-flex flex-wrap drop-resize order-md-1 ms-auto",
  }

  const isValid =
    messages.title === "" &&
    messages.content === "" &&
    messages.languages === "" &&
    messages.categories === "";

  const isOwner = user.pseudo === article.user_pseudo;
  const isAuthor = user.access_lvl > 1;
  const isModo = user.access_lvl > 2;
  const isUpdatable = isOwner && article.id !== -1 && !inDelete;
  const isSavable = (isUpdatable || article.id === -1) && inModif && isValid && !inDelete;
  const isPublicSavable = isSavable && isAuthor && article.status !== "public";
  const isDeletable = (isOwner || isModo) && !inModif;
  const isSubmitable = isOwner && !inModif && article.status === "private" && !inDelete ;
  const isPublishable =
    ((isOwner && isAuthor) || isModo) &&
    !inModif &&
    article.status !== "public" && !inDelete;

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
          <span className={BootStrap.COMMANDS}>
            {isUpdatable && (
              <button
                onClick={() => setInModif(!inModif)}
                className={BootStrap.BUTTON}
              >
                {inModif ? "Annuler" : "Modifier"}
              </button>
            )}
            {isSavable && (
              <button className={BootStrap.BUTTON} onClick={handleSave}>
                Enregistrer
              </button>
            )}
            {isPublicSavable && (
              <button className={BootStrap.BUTTON} onClick={handlePublicSave}>
                Enregistrer et Publier
              </button>
            )}
            {isSubmitable && (
              <button className={BootStrap.BUTTON} onClick={handleSubmit}>
                Demande de publication
              </button>
            )}
            {isDeletable && (
              <span>
                {!inDelete && (
                  <button onClick={()=> setInDelete(true)} className={BootStrap.BAD_BUTTON}>
                    Supprimer
                  </button>
                )}
                {inDelete && (
                  <button onClick={handleDelete} className={BootStrap.BAD_BUTTON}>
                    Valider la suppression
                  </button>
                )}
                {inDelete && (
                  <button onClick={()=> setInDelete(false)} className={BootStrap.BUTTON}>
                    Annuler la suppression
                  </button>
                )}
              </span>
            )}
            {isPublishable && user.access_lvl > 2 && (
              <button className={BootStrap.BUTTON} onClick={handleValidate}>
                Publier
              </button>
            )}
          </span>
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
