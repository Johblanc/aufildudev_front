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


export function ArticleFull(props: { id: number }) {

  const {id} = props
  const [article, setArticle] = useState<TArticleFull>(DEFAULT_ARTICLE);

  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

  const [inModif, setInModif] = useState(false);
  const [currentModif, setCurrentModif] = useState({
    title : "" ,
    content : ""
  })

  const handleModif = (key : "title" | "content" , value : string) =>
  {
    const newModif = {...currentModif} ;
    newModif[key] = value ;
    setCurrentModif(newModif)
  }

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/public/${id}`).then(
      (response) => response.json().then((data) => setArticle(data.data))
    );
  }, [id]);
  return (
    <div>
      <div>
      { inModif &&
        <span>
          <span>
            <DropDown table={"categories"} defaultValue={[]}/>
          </span>
          <span>
            <DropDown table={"languages"} defaultValue={[]}/>
          </span>
          <span>
            <DropDown table={"frameworks"} defaultValue={[]}/>
          </span>
        </span>
      }
      <span>
        <span>
          <button onClick={()=>setInModif(!inModif)}>Modifier</button>
        </span>
      </span>
      </div>
      { !inModif &&
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
      </div>
      }
      { inModif &&
        <div>
          <IconCheckBox defautValue={true}/>
        <EntryString name={"Titre"} defaultValue={article.title} setter={ (value)=> handleModif("title",value)}/>
        <DropDownPublicArticles/>
        <EntryStringArea name={"Contenu"} defaultValue={article.content} setter={ (value)=> handleModif("content",value)}/>
        <p>
          Par {article.user_pseudo} le {new Date(article.created_at).toLocaleDateString()}
        </p>
        <CustomMDEditor value={value} setValue ={setValue} />
      </div>
      }
    </div>
  );
}
