import { ArticleStatus } from "./ArticlesStatus"
import { TArticleFull } from "./TArticleFull"

export type TArticlesHandleParams = {
  command : "add" | "sup" | "update"  , 
  article : TArticleFull 
}