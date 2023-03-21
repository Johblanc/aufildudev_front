import { ArticleStatus } from "../Types/ArticlesStatus";
import { TArticleFull } from "../Types/TArticleFull";

export const DEFAULT_ARTICLE : TArticleFull = {
    id : -1 ,
    title : "Nouvel Article" ,
    content : "" ,
    status : ArticleStatus.PRIVATE ,
    user_pseudo : "" ,
    created_at : new Date() ,
    requirements : [] ,
    needed_for : [] ,
    languages : [],
    categories : [],
    frameworks : []
}