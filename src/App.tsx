import './App.css';
import './profile/profile/profile-style.css';
import './comments/commentStyle.css';
import './navbar/navbar-style.css';
import './navbar/login-style.css';
import './style.css';
import './searchBar/searchBar-style.css';
import { Comments } from './comments/components/Comments';
import { Navbar } from './navbar/components/navbar';
import { LoginForm } from './navbar/components/log';
import { RegisterForm } from './navbar/components/register';
import SearchBar from './searchBar/components/searchBar';
import { Profile } from './profile/components/Profile';
import { useState } from 'react';
import { TUser } from './navbar/types/TUser';
import { UserContext } from './context/UserContext';
import { DEFAULT_USER } from './constant/visitor';
import { UserComment } from './comments/components/UserComment';
import { UpdateCommentContext } from './context/UpdateCommentContext';
import { TComment } from './comments/types/TComment';

function App() {
    const [user, setUser] = useState<TUser>(DEFAULT_USER);
    const [comms, setComms] = useState<TComment[]>([]);

    console.log(user);

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
                        <Comments />
                        <UserComment />
                    </main>
                </UpdateCommentContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
