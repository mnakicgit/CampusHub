import React, { useState } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";

function MyAccountDocumentCard({ ime, autor, kolegij, glasovi, datum, opis, fileUrl }) {
	const [likes, setLikes] = useState(glasovi?.likes || 0);
	const [dislikes, setDislikes] = useState(glasovi?.dislikes || 0);
	const [userVoted, setUserVoted] = useState(false);
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);

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
						<Col className="text-muted">objavljeno: {datum}</Col>
					</Row>

					<Row className="my-4">
						<Col>
							<h6 className="m-0">Opis:</h6>
							{opis}
						</Col>
					</Row>

					<Row className="align-items-end">
						<Col className="text-muted mb-2">
							{totalVotes > 0 ? (
								<div>
									{likePercentage}% od {totalVotes} korisnika je označilo pozitivno ovaj dokument
								</div>
							) : (
								"Nema glasova"
							)}
						</Col>

						<Col className="d-flex justify-content-end">
							{/* <div>
								<Button variant="secondary" href={fileUrl} className="w-100">
									Pregledaj&nbsp;
									<i className="fa-solid fa-eye fa-sm" />
								</Button>
							</div> */}
							{/* <div className="mx-2">
								<a href="/primjer.pdf" download>
									<Button variant="secondary" className="w-100">
										Uredi&nbsp;
										<i className="fa-regular fa-pen-to-square fa-sm" />
									</Button>
								</a>
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

export default MyAccountDocumentCard;
