import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import RegisterPage from "./pages/Register/Register";
// import LoginPage from './component/logIn/Login.js';
import LoginPage from "./pages/LogIn/Login";
// import Main from "./component/main/main.js";
import "./App.scss";
import Header from "./components/Header";

function App() {
	console.log();

	const [idUser, setIdUser] = useState(() => {
		return JSON.parse(localStorage.getItem("IdUser")) || "";
	});
	const [inforUser, setInforUser] = useState({
		name: "",
		image: "",
		address: "",
		gender: "",
		description: ""
	})

	const getStatus = data => {
		if(data.id){
			setIdUser(data.id);
			JSON.stringify(localStorage.setItem("IdUser", data.id));
		}
	};


	useEffect( () => {
		const url = `http://localhost:3001/user&iduser=${idUser}`
		fetch(url)
		.then(res => {
			return res.json();
		})
		.then(data => {
			if(data.type === "success"){
				const user = data.data
				setInforUser({
					name: user.name,
					image: "",
					address: "",
					gender: "",
					description: ""
				})
			}
		});
	}, [])
	return (
		<div className="app">
			<Router>
				{idUser !== "" ? <Redirect to="/" /> : <Redirect to="/login" />}

				<Route path="/" 
					exact 
					render={() => 
						<Header 
							name = {inforUser.name}
						/>
					}
				/>
				<Route
					path="/login"
					exact
					render={() => <LoginPage sattus={getStatus} />}
				/>
				<Route path="/register" exact render={() => <RegisterPage />} />
			</Router>
		</div>
	);
}

export default App;
