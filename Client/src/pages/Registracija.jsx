import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import UserContext from "../UserContext";

function Registracija({ changeUserFunction }) {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [jmbag, setJmbag] = useState(0);
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	//server ocekuje [username, jmbag]
	const handleSubmit = (e) => {
		e.preventDefault();

		if (password === password2) {
			var zaSlanje = [username, jmbag];
			console.log(zaSlanje);

			changeUserFunction("user");
			console.log(UserContext);
			axios.post("http://localhost:5000/", zaSlanje).then((rez) => console.log(rez));

			navigate("/myaccount");
		} else {
			setPassword("");
			setPassword2("");
		}
	};
	return (
		<>
			<div className="d-flex flex-column align-items-center  mt-5" style={{ position: "relative", top: "0", left: "0" }}>
				<img
					src="src/assets/logoPozadina.png"
					alt="CampusHub logo"
					style={{ width: "10rem", position: "absolute", top: "-6rem", left: "126px", zIndex: "5", filter: "drop-shadow(0px 7px 7px rgba(1, 12, 24, 40%))" }}
				/>
				<Card className="rounded-4 pt-5" style={{ minWidth: "22rem", position: "relative", top: "0px", left: "0px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
					<Card.Body>
						<Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
							<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormUsername">
								<Form.Label>Username</Form.Label>
								<Form.Control required type="text" placeholder="Upiši username" value={username} onChange={(e) => setUsername(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="formBasicEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control required type="email" placeholder="Upiši email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormJMBAG">
								<Form.Label>JMBAG</Form.Label>
								<Form.Control required type="number" placeholder="Upiši JMBAG" min="1000000000" max="9999999999" value={jmbag} onChange={(e) => setJmbag(e.target.value)} />
								<Form.Text className="text-muted mb-1">JMBAG nam je potreban kako bi potvrdili da si zaista student</Form.Text>
							</Form.Group>

							<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control required type="password" placeholder="Upiši password" value={password} onChange={(e) => setPassword(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormPassword">
								<Form.Label>Potvrdi password</Form.Label>
								<Form.Control required type="password" placeholder="Potvrdi password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
							</Form.Group>

							<Button variant="primary" type="submit">
								Registracija
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="mt-4 mb-2 w-100 d-flex justify-content-center align-items-center">
					<Link to="/login" style={{ textDecoration: "none" }}>
						<Button style={{ width: "9em", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }}>Prijavi se</Button>
					</Link>
					<span className="mx-2 text-white">ili</span>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Button style={{ width: "9em", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }}>Nastavi kao gost</Button>
					</Link>
				</div>
				<div className="text-white">Neprijavljeni korisnici nemaju pristup privatnom sadržaju</div>
			</div>
		</>
	);
}

export default Registracija;
