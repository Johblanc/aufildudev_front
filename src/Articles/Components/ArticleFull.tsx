import { useEffect, useState } from "react";
import { EntryString } from "../../Entries/Components/EntryString";
import { EntryStringArea } from "../../Entries/Components/EntryStringArea";
import DropDown from "../../searchBar/components/dropdown";
import { DEFAULT_ARTICLE } from "../Constant/DefaultArticle";
import { TArticleFull } from "../Types/TArticleFull";
import DropDownPublicArticles from "./DropdownPublicArticles";
import { IconCheckBox } from "./Icon_CheckBox";
import MDEditor from '@uiw/react-md-editor';
import { CustomMDEditor } from "./CustumMDEditor/CustomMDEditor";
import { TablesEnums } from "../../searchBar/types/tablesEnums";
import { ArticleComments } from "../../comments/components/articleComments/ArticleComments";


export function ArticleFull(props: { id: number }) {

  const { id } = props
  const [article, setArticle] = useState<TArticleFull>(DEFAULT_ARTICLE);

  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

  const [inModif, setInModif] = useState(false);
  const [currentModif, setCurrentModif] = useState({
    title: "",
    content: ""
  })

  const [selections, setSelections] = useState({
    languages: [] as number[],
    frameworks: [] as number[],
    categories: [] as number[]
  })

  const handleModif = (key: "title" | "content", value: string) => {
    const newModif = { ...currentModif };
    newModif[key] = value;
    setCurrentModif(newModif)
  }

  const handleSelections = (table: TablesEnums, value: number[]) => {
    const newSelection = { ...selections }
    newSelection[table] = value
    setSelections(newSelection)
  }
  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/public/${id}`).then(
      (response) => response.json().then((data) => setArticle(data.data))
    );
  }, [id]);
  return (
    <div>
      <div>
        {inModif &&
          <span>
            <span>
              <DropDown table={TablesEnums.categories} defaultValue={[]} setValue={handleSelections} />
            </span>
            <span>
              <DropDown table={TablesEnums.languages} defaultValue={[]} setValue={handleSelections} />
            </span>
            <span>
              <DropDown table={TablesEnums.frameworks} defaultValue={[]} setValue={handleSelections} />
            </span>
          </span>
        }

        <span>
          <span>
            <button onClick={() => setInModif(!inModif)}>Modifier</button>
          </span>
        </span>
      </div>
      {!inModif &&
        <div>
          <h3 className="bg-success">{article.title}</h3>
          <p>
            Prérequis :{" "}
            {article.requirements.map((item) => item.title).join(", ")}
          </p>
          <p>
            Langages : {article.languages.map((item) => item.name).join(", ")}
          </p>
          <p>
            FrameWorks : {article.frameworks.map((item) => item.name).join(", ")}
          </p>
          <p>
            Catégorie : {article.categories.map((item) => item.name).join(", ")}
          </p>
          <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
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
      }
      { inModif &&
        <div>
          <IconCheckBox defautValue={true} />
          <EntryString name={"Titre"} defaultValue={article.title} setter={(value) => handleModif("title", value)} />
          <DropDownPublicArticles />
          <EntryStringArea name={"Contenu"} defaultValue={article.content} setter={(value) => handleModif("content", value)} />
          <p>
            Par {article.user_pseudo} le {new Date(article.created_at).toLocaleDateString()}
          </p>
          <CustomMDEditor value={value} setValue={setValue} />
        </div>
      }
    </div>
  );
}
