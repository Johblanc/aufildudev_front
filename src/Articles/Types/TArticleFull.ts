import { TMini } from "../../searchBar/types/TMini"
import { TArticleMini } from "./TArticleMini"


export type TArticleFull = {
    id : number ,
    title : string ,
    content : string ,
    status : string ,
    user_pseudo : string ,
    created_at : Date ,
    requirements : TArticleMini[] ,
    needed_for : TArticleMini[] ,
    languages : TMini[],
    categories : TMini[],
    frameworks : TMini[]
}