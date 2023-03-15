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

function App() {
  const [user, setUser] = useState<TUser>(DEFAULT_USER);
  const [comms, setComms] = useState<TComment[]>([]);
  const [article, setArticle] = useState(DEFAULT_ARTICLE);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <UpdateCommentContext.Provider value={{ comms, setComms }}>
          <ArticleContext.Provider value={{ article, setArticle }}>
            <header>
              <Navbar />
              <div className="shadow">
                <SearchBar />
              </div>
            </header>

            <main className="container-fluid">
              <LoginForm />
              <RegisterForm />
              {/*A destination de profil Admin et Modo */}
              {user.access_lvl > 2 ? <AllComments /> : ""}
              {/*A destination de tous profil*/}
              <UserComment />
              <div className="d-md-flex">
                <ArticlesSelector />
                <ArticleFull />
                <Tchat /> 
              </div>
            </main>
          </ArticleContext.Provider>
        </UpdateCommentContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
