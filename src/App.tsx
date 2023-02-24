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
import { UserContext } from './context/UserContext';
import { visitor } from './constant/visitor';
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(visitor);

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
                <LoginForm />
                <RegisterForm />
                <Comments />
            </main>
        </div>
    );
}

export default App;
