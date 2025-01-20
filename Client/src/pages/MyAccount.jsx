import { React, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import MyAccountDocumentCard from "../components/MyAccountDocumentCard";
import axios from "axios";

const allDocuments = [
	{
		ime: "MojDokument.pdf",
		autor: "Ana Anić",
		postotak: "75",
		glasovi: "80",
		datum: "1.12.2024.",
		opis: "Primjer riješenih zadataka na laboratorijskim vježbama",
		kolegij: "Programiranje 1",
		fakultet: "FESB",
		smijer: "Računarstvo",
		godina: "1.",
	},
	{
		ime: "SkriptaRadnaVerzija.pdf",
		autor: "Ivo Ivić",
		postotak: "91",
		glasovi: "100",
		datum: "11.11.2024.",
		opis: "Kratki opis",
		kolegij: "Programsko Inženjerstvo",
		fakultet: "PMF",
		smijer: "Elektro",
		godina: "2.",
	},
	{
		ime: "NajboljaSkriptaIkad.pdf",
		autor: "Marija Marić",
		postotak: "20",
		glasovi: "10",
		datum: "1.12.2024.",
		opis: "No comment.",
		kolegij: "Programiranje 2",
		fakultet: "FESB",
		smijer: "Računarstvo",
		godina: "2.",
		fileUrl: "/path-to-pdf/MojDokument.pdf",
	},
];

function MyAccount() {
	const [uploadEnabled, setUploadEnabled] = useState(false);
	const [fakultet, setFakultet] = useState("");
	const [smijer, setSmijer] = useState("");
	const [godina, setGodina] = useState("");
	const [kolegij, setKolegij] = useState("");
	const [privatno, setPrivatno] = useState(false);
	const [opis, setOpis] = useState("");

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		if (name === "fakultet") setFakultet(value);
		if (name === "smijer") setSmijer(value);
		if (name === "godina") setGodina(value);
		if (name === "kolegij") setKolegij(value);
	};

	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedFile) {
			var zaSlanje = [username, jmbag];
			console.log(zaSlanje);

			axios.post("http://localhost:5000/", zaSlanje).then((rez) => console.log(rez));
		} else {
			alert("Odaberi datoteku za upload");
		}
	};

	return (
		<div>
			{/* vidi w3schools tutorial kako uploadati dokument, drag and drop...*/}
			{/*link na njihov servera:*/}
			{/* <form action="">
				<input type="file" id="myFile" name="filename" />
				<input type="submit" />
			</form> */}
			<Card className="rounded-4 mx-2 py-2" style={{ background: "#f0f0f0", border: "none" }}>
				<Card.Body>
					{/* privremena boja pozadine */}
					<Container>
						<Row className="d-flex align-items-end">
							<Col md="3" sm="3">
								<h4 className="my-0">@MojUsername</h4>
							</Col>
							<Col>
								<h6 className="my-0 text-muted">mojmail@gmail.com</h6>
							</Col>
							<Col className="d-flex justify-content-end">
								{!uploadEnabled && (
									<Button className="mx-2" onClick={() => setUploadEnabled(!uploadEnabled)}>
										Novi Dokument
									</Button>
								)}
								<Button>Odjava</Button>
							</Col>
						</Row>
					</Container>
				</Card.Body>
			</Card>

			{/* Sucelje za upload: */}
			{uploadEnabled && (
				<Card className="rounded-4 mx-2 my-4 py-2" style={{ background: "#f0f0f0", border: "none" }}>
					<Card.Header className="d-flex justify-content-center">
						<h5>Upload</h5>
					</Card.Header>
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Container>
								<Row>
									<Form.Group controlId="formFile" className="mb-4">
										<Form.Label>Odaberi dokument</Form.Label>
										<Form.Control type="file" onChange={handleFileChange} />
									</Form.Group>
								</Row>
								<Form.Label>Odaberi kolegij</Form.Label>
								<Row xs={1} sm={1} md={2} lg={4}>
									<Col>
										<Form.Select className="mb-2" aria-label="Odabir fakulteta" name="fakultet" value={fakultet} onChange={handleFilterChange}>
											{/* style={{ background: "#b7dfc5" }} promijeniti kasnije */}
											<option value="">Svi fakulteti</option>
											<option value="FESB">FESB</option>
											<option value="PMF">PMF</option>
										</Form.Select>
									</Col>
									<Col>
										<Form.Select className="mb-2" aria-label="Odabir smijera" name="smijer" value={smijer} onChange={handleFilterChange}>
											<option value="">Svi smjerovi</option>
											<option value="Računarstvo">Računarstvo</option>
											<option value="Elektro">Elektro</option>
										</Form.Select>
									</Col>
									<Col>
										<Form.Select className="mb-2" aria-label="Odabir godine" name="godina" value={godina} onChange={handleFilterChange}>
											<option value="">Sve godine</option>
											<option value="1.">1.</option>
											<option value="2.">2.</option>
											<option value="3.">3.</option>
										</Form.Select>
									</Col>
									<Col>
										<Form.Select className="mb-3" aria-label="Odabir kolegija" name="kolegij" value={kolegij} onChange={handleFilterChange}>
											<option value="">Svi kolegiji</option>
											<option value="Programiranje">Programiranje</option>
											<option value="Programiranje 2">Programiranje 2</option>
											<option value="Programsko Inženjerstvo">Programsko Inženjerstvo</option>
										</Form.Select>
									</Col>
								</Row>
								<Row>
									<Form.Group className="mb-3 p-3 w-100 d-flex flex-column" controlId="opisField">
										<Form.Label>Opis</Form.Label>
										<Form.Control required type="text" placeholder="Kratko opiši svoju skriptu" value={opis} onChange={(e) => setOpis(e.target.value)} />
									</Form.Group>
								</Row>
								<Row className="d-flex align-items-end">
									<Col md="3" sm="3" className="d-flex align-items-end ">
										<Form.Check type="checkbox" label="privatno" name="privatno" value={privatno} onChange={(e) => setPrivatno(e.target.checked)}></Form.Check>
									</Col>
									<Col>
										<h6 className="my-0 text-muted">Privatnim dokumentima imaju pristup samo prijavljeni studenti</h6>
									</Col>
									<Col className="d-flex justify-content-end">
										<Button onClick={() => setUploadEnabled(!uploadEnabled)} className="mx-2" variant="danger">
											Odustani
										</Button>
										<Button onClick={() => setUploadEnabled(!uploadEnabled)}>Potvrdi</Button>
									</Col>
								</Row>
							</Container>
						</Form>
					</Card.Body>
				</Card>
			)}

			<Container className="mt-5">
				<h4 className="my-4">Moji dokumenti</h4>
				<Row className="d-flex flex-wrap">
					{allDocuments.map((doc, index) => (
						<MyAccountDocumentCard
							key={index}
							ime={doc.ime}
							autor={doc.autor}
							postotak={doc.postotak}
							glasovi={doc.glasovi}
							datum={doc.datum}
							opis={doc.opis}
							kolegij={doc.kolegij}
							fileUrl={doc.fileUrl}
						/>
					))}
				</Row>
			</Container>
		</div>
	);
}

export default MyAccount;
