import './App.css';
import './navbar/navbar-style.css'
import './navbar/login-style.css'
import { Comments } from './comments/components/Comments';
import { Navbar } from './navbar/components/navbar';
import { useState } from 'react';
import LoginForm from './navbar/components/login_register';



function App() {
    const [isShowLogin, setIsShowLogin] = useState(false)

    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin)
    };


    return (
        <div className="App">
            <Navbar handleLoginClick={handleLoginClick} />
            {isShowLogin && <LoginForm isShowLogin={isShowLogin} />}
            <Comments />
        </div>
    );
}

export default App;
