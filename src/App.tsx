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
//import { visitor } from './constant/visitor';
import { useState } from 'react';
import { TUser } from './TUser';

function App() {
    const [user, setUser] = useState<TUser>();

    console.log(user);

    return (
        <div className="App">
            <header className="shadow">
                <Navbar />
            </header>

            <main className="container-fluid">
                <div className="shadow">
                    <SearchBar />
                </div>
                <LoginForm /* setUser={setUser} */ />
                <RegisterForm />
                <Comments />
            </main>
        </div>
    );
}

export default App;
