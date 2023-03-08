import './App.css';
import './comments/commentStyle.css';
import './navbar/navbar-style.css';
import './navbar/login-style.css';
import './style.css';
import './searchBar/searchBar-style.css';
import { AllComments } from './comments/components/allComments/AllComments';
import { Navbar } from './navbar/components/navbar';
import { LoginForm } from './navbar/components/log';
import { RegisterForm } from './navbar/components/register';
import SearchBar from './searchBar/components/searchBar';
import { useState } from 'react';
import { TUser } from './navbar/types/TUser';
import { UserContext } from './context/UserContext';
import { DEFAULT_USER } from './constant/visitor';
import { UserComment } from './comments/components/userComment/UserComment';
import { UpdateCommentContext } from './context/UpdateCommentContext';
import { TComment } from './comments/types/TComment';
import { ArticleComments } from './comments/components/articleComments/ArticleComments';

function App() {
    const [user, setUser] = useState<TUser>(DEFAULT_USER);
    const [comms, setComms] = useState<TComment[]>([]);

    return (
        <div className="App">
            <UserContext.Provider value={{ user, setUser }}>
                <UpdateCommentContext.Provider value={{ comms, setComms }}>
                    <header>
                        <Navbar />
                    </header>

                    <main className="container-fluid">
                        <div className="shadow">
                            <SearchBar />
                        </div>
                        <LoginForm />
                        <RegisterForm />
                        {/*A destination de profil Admin et Modo */}
                        <AllComments />
                        {/*A destination de tous profil*/}
                        <UserComment />
                        {/*A destination de l'article*/}
                        <ArticleComments articleId={1} />
                    </main>
                </UpdateCommentContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
