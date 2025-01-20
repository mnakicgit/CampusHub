import React, { useState } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";

function NewDocumentCard({ ime, autor, kolegij, glasovi, datum, opis, fileUrl }) {
	const [likes, setLikes] = useState(glasovi?.likes || 0); // Broj lajkova
	const [dislikes, setDislikes] = useState(glasovi?.dislikes || 0); // Broj dislajkova
	const [userVoted, setUserVoted] = useState(false); // Praćenje je li korisnik glasao
	const [liked, setLiked] = useState(false); // Je li korisnik lajkao
	const [disliked, setDisliked] = useState(false); // Je li korisnik dislajkao

	const handleLike = () => {
		if (!userVoted) {
			setLikes(likes + 1);
			setLiked(true);
			setUserVoted(true);
		}
	};

	const handleDislike = () => {
		if (!userVoted) {
			setDislikes(dislikes + 1);
			setDisliked(true);
			setUserVoted(true);
		}
	};

	const totalVotes = likes + dislikes;
	const positiveVotes = likes;
	const likePercentage = totalVotes > 0 ? Math.round((positiveVotes / totalVotes) * 100) : 0;

	return (
		<Container fluid className="mb-3">
			<Card>
				<Card.Header as="h6">{kolegij}</Card.Header>
				<Card.Body className="px-4">
					<Row className="align-items-end">
						<Col md="3" sm="3">
							<Card.Title
								className="mb-0"
								style={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
									lineHeight: "normal",
								}}
							>
								{ime}
							</Card.Title>
						</Col>
						<Col md="2" sm="3" className="text-muted">
							<i>autor: {autor}</i>
						</Col>
						<Col md="2" sm="3" className="text-muted">
							objavljeno: {datum}
						</Col>
					</Row>

					<Row className="my-4">
						<Col>
							<h6 className="m-0">Opis:</h6>
							{opis}
						</Col>
					</Row>

					<Row className="align-items-end">
						<Col sm="12" md="3" className="text-muted mb-2">
							{totalVotes > 0 ? (
								<div>
									{likePercentage}% od {totalVotes} korisnika je označilo pozitivno ovaj dokument
								</div>
							) : (
								"Nema glasova"
							)}
						</Col>
						<Col sm="4" md="3" className="d-flex text-primary">
							<div onClick={handleLike}>
								<i
									className={`fa-thumbs-up fa-xl  ${liked ? "fa-solid" : "fa-regular"}`}
									style={{
										transform: "translateY(-5px)",
										cursor: "pointer",
									}}
								></i>
							</div>
							<div className={`${disliked ? "text-primary" : ""}`} onClick={handleDislike}>
								<i
									className={`fa-regular fa-thumbs-down fa-flip-horizontal fa-xl mx-2 ${disliked ? "fa-solid" : "fa-regular"}`}
									style={{
										cursor: "pointer",
									}}
								></i>
							</div>
						</Col>
						<Col sm="8" md="6" className="d-flex justify-content-end">
							{/* <div className="mx-2">
								<Button variant="secondary" href={fileUrl} className="w-100">
									Pregledaj&nbsp;
									<i className="fa-solid fa-eye fa-sm" />
								</Button>
							</div> */}
							<div>
								<a href="/primjer.pdf" download>
									<Button variant="primary" className="w-100">
										Download&nbsp;
										<i className="fa-solid fa-download fa-sm" />
									</Button>
								</a>
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default NewDocumentCard;
