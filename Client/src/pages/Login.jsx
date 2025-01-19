import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

function Login() {
	return (
		<>
			<div className="d-flex flex-column align-items-center" style={{ position: "relative", top: "0", left: "0" }}>
				<img
					src="src/assets/logoPozadina.png"
					alt="CampusHub logo"
					style={{ width: "10rem", position: "absolute", top: "-6rem", left: "123px", zIndex: "5", filter: "drop-shadow(0px 7px 7px rgba(1, 12, 24, 40%))" }}
				/>
				<Card className="rounded-4 pt-5" style={{ minWidth: "22rem", position: "relative", top: "0px", left: "0px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
					<Card.Body>
						<Form className="d-flex flex-column align-items-center">
							<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormUsername">
								<Form.Label>Username</Form.Label>
								<Form.Control type="text" placeholder="Upiši username" />
							</Form.Group>

							<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Upiši password" />
							</Form.Group>

							<Button className="mt-2" variant="primary" type="submit">
								Prijava
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="mt-4 mb-2 w-100 d-flex justify-content-center align-items-center">
					<Link to="/registracija" style={{ textDecoration: "none" }}>
						<Button style={{ width: "9em", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }}>Registriraj se</Button>
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

export default Login;
