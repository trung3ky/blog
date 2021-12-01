import React, { useState } from "react";
import FormRegister from "./FormRegister.js";
import { Redirect } from "react-router";

function Register(props) {
	const [type, setType] = useState("");

	const RegisterHanlder = data => {
		console.log(data)
		try {
			fetch("http://localhost:3001/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data), //
			})
				.then(res => {
					return res.json();
				})
				.then(data => {
					if (data.type === "success") {
						setType("Success");
					} else {
						setType("Error");
						console.log("thất bại");
					}
				});
		} catch (error) {
			console.log("message erro", error.message);
		}
	};

	return type === "Success" ? (
		<Redirect to="/login" />
	) : (
		<div className="login">
			<FormRegister Register={RegisterHanlder} />
		</div>
	);
}

Register.propTypes = {};

export default Register;
