import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./pages/Register/Register";
// import LoginPage from './component/logIn/Login.js';
import LoginPage from "./pages/LogIn/Login";
// import Main from "./component/main/main.js";
import "./App.scss";
import Header from "./components/Header";

function App() {

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

			setInforUser( getInforUser => ({
				...getInforUser,
				...data
			}))
		}
	};


	useEffect( () => {
		let isRun = true;
		(async () => {
			try {
				if(idUser) {
					const url = `http://localhost:3001/user&iduser=${idUser.toString()}`
					const request = await fetch(url)
					const response = await request.json()
					const {type, data} = response
			
					if(isRun && type === "success"){
						setInforUser( getInforUser => ({
							...getInforUser,
							...data
						}))
					}
				}

			} catch (error) {
				alert(error.message)
			}

		})();

		return () => {
			isRun = false
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className="app">
			<Router>
				{idUser !== "" ? <Redirect to="/" /> : <Redirect to="/login" />}

				<Route path="/" 
					exact 
					render={() => 
						<Header 
							info = {inforUser}
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
