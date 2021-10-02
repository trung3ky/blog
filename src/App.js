import React, {useState} from 'react'
import {BrowserRouter as Router, Route , Redirect} from "react-router-dom";

import RegisterPage from './component/register/Register.js';
import LoginPage from './component/logIn/Login.js';
import Main from './component/main/main.js';
import './App.css';



function App() {
    console.log()

    const [idUser, setIdUser] = useState(() => {return JSON.parse(localStorage.getItem("IdUser")) || "" })

    const getStatus = (data) => {
        setIdUser(data)
        JSON.stringify(localStorage.setItem("IdUser", data))
    }

    console.log(idUser)
    return (
        <div className="app">
            <Router>
                {idUser !== "" ? (
                    <Redirect to="/" />
                ) : (
                    <Redirect to="/login" />
                )}
                
                <Route path="/" exact render={() => <Main />} />
                <Route path="/login" exact render={() => <LoginPage sattus={getStatus}/>} />
                <Route path="/register" exact render={() => <RegisterPage/>} />
            </Router>
        </div>
    )
}

export default App
