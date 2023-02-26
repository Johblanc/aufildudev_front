import { useEffect, useState } from "react";
import { DEFAULT_ARTICLE } from "../Constant/DefaultArticle";
import { TArticleFull } from "../Types/TArticleFull";


export function ArticleFull(props : { id  : number}){

    const [article , setArticle] = useState<TArticleFull>(DEFAULT_ARTICLE)

    useEffect(() => {
        fetch(`http://localhost:3000/api/articles/public/${props.id}`)
        .then((response) =>
            response.json().then((data) => setArticle(data.data))
        );
    }, []);
    return (
        <div>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>Prérequis : {article.requirements.map(item =>item.title).join(", ")}</p>
            <p>Langages : {article.languages.map(item =>item.name).join(", ")}</p>
            <p>FrameWorks : {article.frameworks.map(item =>item.name).join(", ")}</p>
            <p>Catégorie : {article.categories.map(item =>item.name).join(", ")}</p>
            <p>Par {article.user_pseudo} le {new Date(article.created_at).toLocaleDateString()}</p>
            <p>voir ensuite : {article.needed_for.map(item =>item.title).join(", ")}</p>
        </div>
    )
}