import './App.css';
import './profile/style/profile-style.css';
import './comments/commentStyle.css';
import './navbar/navbar-style.css';
import './navbar/login-style.css';
import './Tchat/tchatStyle.css';
import './style.css';
import './searchBar/searchBar-style.css';
import { Navbar } from './navbar/components/navbar';
import { LoginForm } from './navbar/components/log';
import { RegisterForm } from './navbar/components/register';
import SearchBar from './searchBar/components/searchBar';
import { Profile } from './profile/components/Profile';
import { useState } from 'react';
import { TUser } from './navbar/types/TUser';
import { UserContext } from './context/UserContext';
import { DEFAULT_USER } from './constant/visitor';
import { UpdateCommentContext } from './context/UpdateCommentContext';
import { TComment } from './comments/types/TComment';
import { ArticleFull } from './Articles/Components/ArticleFull/ArticleFull';
import { Tchat } from './Tchat/components/Tchat';
import { ArticlesSelector } from './Articles/Components/ArticlesSelector/ArticlesSelector';
import { DEFAULT_ARTICLE } from './Articles/Constant/DefaultArticle';
import { ArticleContext } from './context/ArticleContext';
import Footer from './footer/components/footer';
import { TArticlesHandleParams } from './Articles/Types/TArticlesHandleParams';

function App() {
    const [page, setPage] = useState<'Article' | 'Profile'>('Article');
    const [user, setUser] = useState<TUser>(DEFAULT_USER);
    const [comms, setComms] = useState<TComment[]>([]);
    const [article, setArticle] = useState(DEFAULT_ARTICLE);
    const [articlesHandle, setArticlesHandle] =
        useState<TArticlesHandleParams>();
    const [searchOption, setSearchOption] = useState({
        languages: [] as number[],
        frameworks: [] as number[],
        categories: [] as number[],
        inputSearch: '',
        inputTitle: '',
        inputAuthor: '',
    });

    return (
        <div className='app'>
            <UserContext.Provider value={{ user, setUser }}>
                <UpdateCommentContext.Provider value={{ comms, setComms }}>
                    <ArticleContext.Provider
                        value={{
                            article,
                            setArticle,
                            articlesHandle,
                            setArticlesHandle,
                        }}
                    >
                        <header>
                            <Navbar setPage={setPage} page={page} />
                            <div className="shadow">
                                <SearchBar setSearchOption={setSearchOption} />
                            </div>
                        </header>

                        <main className="container-fluid">
                            <LoginForm />
                            <RegisterForm />
                            <div className="d-md-flex mt-3">
                                <ArticlesSelector
                                    setPage={setPage}
                                    searchOption={searchOption}
                                />
                                {page === 'Article' && <ArticleFull />}
                                {page === 'Profile' && <Profile />}
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
