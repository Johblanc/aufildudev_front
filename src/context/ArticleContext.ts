import React from "react";
import { DEFAULT_ARTICLE } from "../Articles/Constant/DefaultArticle";
import { TArticleFull } from "../Articles/Types/TArticleFull";
import { TArticlesHandleParams } from "../Articles/Types/TArticlesHandleParams";

export const ArticleContext = React.createContext({
  article : DEFAULT_ARTICLE,
  setArticle: (value: TArticleFull) => {},
  articlesHandle : undefined as TArticlesHandleParams | undefined,
  setArticlesHandle: (value: TArticlesHandleParams | undefined) => {},
});
