import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Registracija() {
	return (
		<>
			<Card className="rounded-4">
				<Card.Body>
					<Form className="d-flex flex-column align-items-center">
						<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control type="text" placeholder="Upiši username" />
						</Form.Group>

						<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormJMBAG">
							<Form.Label>JMBAG</Form.Label>
							<Form.Control type="number" placeholder="Upiši JMBAG" min="1000000000" max="9999999999" />
							<Form.Text className="text-muted mb-1">JMBAG nam je potreban kako bi potvrdili da ste zaista student</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Upiši password" />
						</Form.Group>

						<Form.Group className="mb-3 w-100 d-flex flex-column align-items-center" controlId="loginFormPassword">
							<Form.Label>Ponovi password</Form.Label>
							<Form.Control type="password" placeholder="Upiši password" />
						</Form.Group>

						<Button variant="primary" type="submit">
							Registracija
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
}

export default Registracija;
