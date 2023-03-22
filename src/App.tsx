import "./App.css";
import "./profile/style/profile-style.css";
import "./comments/commentStyle.css";
import "./navbar/navbar-style.css";
import "./navbar/login-style.css";
import './Tchat/tchatStyle.css'
import "./style.css";
import "./searchBar/searchBar-style.css";
import { AllComments } from "./comments/components/allComments/AllComments";
import { Navbar } from "./navbar/components/navbar";
import { LoginForm } from "./navbar/components/log";
import { RegisterForm } from "./navbar/components/register";
import SearchBar from "./searchBar/components/searchBar";
//import { Profile } from './profile/components/Profile';
import { useState } from "react";
import { TUser } from "./navbar/types/TUser";
import { UserContext } from "./context/UserContext";
import { DEFAULT_USER } from "./constant/visitor";
import { UserComment } from "./comments/components/userComment/UserComment";
import { UpdateCommentContext } from "./context/UpdateCommentContext";
import { TComment } from "./comments/types/TComment";
import { ArticleFull } from "./Articles/Components/ArticleFull/ArticleFull";
import { Tchat } from "./Tchat/components/Tchat";
import { ArticlesSelector } from "./Articles/Components/ArticlesSelector/ArticlesSelector";
import { DEFAULT_ARTICLE } from "./Articles/Constant/DefaultArticle";
import { ArticleContext } from "./context/ArticleContext";
import Footer from "./footer/components/footer";
import { TArticleFull } from "./Articles/Types/TArticleFull";
import { TArticlesHandleParams } from "./Articles/Types/TArticlesHandleParams";

function App() {
  const [user, setUser] = useState<TUser>(DEFAULT_USER);
  const [comms, setComms] = useState<TComment[]>([]);
  const [article, setArticle] = useState(DEFAULT_ARTICLE);
  const [articlesHandle, setArticlesHandle] = useState<TArticlesHandleParams>();
  const [searchOption, setSearchOption] = useState({
    languages: [] as number[],
    frameworks: [] as number[],
    categories: [] as number[],
    inputSearch: '',
    inputTitle: '',
    inputAuthor: '',
  })



  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <UpdateCommentContext.Provider value={{ comms, setComms }}>
          <ArticleContext.Provider value={{ article, setArticle, articlesHandle, setArticlesHandle }}>
            <header>
              <Navbar />
              <div className="shadow">
                <SearchBar setSearchOption={setSearchOption} />
              </div>
            </header>

            <main className="container-fluid m-bottom ">
              <LoginForm />
              <RegisterForm />
              {/*A destination de profil Admin et Modo */}
              {user.access_lvl > 2 ? <AllComments /> : ""}
              {/*A destination de tous profil*/}
              <UserComment />
              <div className="d-md-flex">
                <ArticlesSelector searchOption={searchOption} />
                <ArticleFull />
                <Tchat />
              </div>
            </main>
          </ArticleContext.Provider>
        </UpdateCommentContext.Provider>
      </UserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
