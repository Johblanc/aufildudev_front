import React from "react";
import { DEFAULT_ARTICLE } from "../Articles/Constant/DefaultArticle";
import { TArticleFull } from "../Articles/Types/TArticleFull";

export const ArticleContext = React.createContext({
  article : DEFAULT_ARTICLE,
  setArticle: (value: TArticleFull) => {},
});
