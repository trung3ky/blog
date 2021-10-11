import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FormLogin from "./FormLogin";

function Login({ sattus }) {
	const [error, setError] = useState("");

	const Login = async data => {
		try {
			const options = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			};
			await fetch("http://localhost:3001/signin", options)
				.then(res => {
					return res.json();
				})
				.then(data => {
					if (data.type === "error") {
						setError("Tài khoản mật khẩu không chính xác!");
					} else {
						setError("");
						sattus(data.data.id);
					}
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="login">
			<FormLogin Login={Login} FaildLogin={error} />
		</div>
	);
}

export default Login;
