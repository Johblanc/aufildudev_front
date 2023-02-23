import './App.css';
import './comments/commentStyle.css';
import './navbar/navbar-style.css';
import './navbar/login-style.css';
import './style.css'
import { Comments } from './comments/components/Comments';
import { Navbar } from './navbar/components/navbar';
import { LoginForm } from './navbar/components/log';
import { RegisterForm } from './navbar/components/register';
import SearchBar from './searchBar/components/searchBar';

function App() {
    return (

        <div className="App">
            <header className='shadow'>
                <Navbar />

            </header>

            <main className='container'>
                <LoginForm />
                <RegisterForm  />
                <SearchBar/>
                <Comments />
                
            </main>
        </div>

    );

}

export default App;
