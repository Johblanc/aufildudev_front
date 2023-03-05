import './App.css';
import './comments/commentStyle.css';
import './navbar/navbar-style.css';
import './navbar/login-style.css';
import './style.css'
import './searchBar/searchBar-style.css'
import { Comments } from './comments/components/Comments';
import { Navbar } from './navbar/components/navbar';
import { LoginForm } from './navbar/components/log';
import { RegisterForm } from './navbar/components/register';
import SearchBar from './searchBar/components/searchBar';
import { useState } from 'react';
import { TUser } from './navbar/types/TUser';
import { UserContext } from './context/UserContext';
import { DEFAULT_USER } from './constant/visitor';

function App() {
    
    const [user, setUser] = useState<TUser>(DEFAULT_USER);

    console.log(user);

    return (
        <div className="App">
            <UserContext.Provider value={{user,setUser}}>
            <header className="shadow">
                <Navbar />
            </header>

            <main className="container-fluid">
                <div className="shadow">
                    <SearchBar />
                </div>
                <LoginForm/>
                <RegisterForm />
                <Comments />
            </main>
            </UserContext.Provider>
        </div>
    );
}

export default App;
