import './App.css';
import './comments/commentStyle.css';
import './navbar/navbar-style.css';
import './navbar/login-style.css';
import { Comments } from './comments/components/Comments';
import { Navbar } from './navbar/components/navbar';
import { LoginForm } from './navbar/components/log';
import { RegisterForm } from './navbar/components/register';

function App() {
    return (
        <div className="App">
            <Navbar />
            <LoginForm />
            <RegisterForm />
            <Comments />
        </div>
    );
}

export default App;
