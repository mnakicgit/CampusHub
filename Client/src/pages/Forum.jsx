//za Forum.jsx
import React, { useState, useEffect } from "react";
import "./Forum.css";

function Forum() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [forums, setForums] = useState([]);
	const [myForums, setMyForums] = useState([]); // List of forums created by the logged-in user
	const [newForumTitle, setNewForumTitle] = useState("");
	const [newComment, setNewComment] = useState("");
	const [loggedInUser, setLoggedInUser] = useState("Ana");
	const [showCreateForum, setShowCreateForum] = useState(false);
	const [showAllForums, setShowAllForums] = useState(false);
	const [selectedForum, setSelectedForum] = useState(null);
	const [showFavorites, setShowFavorites] = useState(false);
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
	const [showCreatedByMe, setShowCreatedByMe] = useState(false);
	const [favorites, setFavorites] = useState([]);
	const [uploadedFile, setUploadedFile] = useState(null);
	const [userRole, setUserRole] = useState("user"); // Default is 'user', can be 'admin'

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		const hasDismissedMessage = localStorage.getItem("dismissedWelcomeMessage");
		if (hasDismissedMessage) {
			setShowWelcomeMessage(true);
		}
	}, []);

	const dismissWelcomeMessage = () => {
		setShowWelcomeMessage(false);
		localStorage.setItem("dismissedWelcomeMessage", "true");
	};

	const createForum = () => {
		if (newForumTitle.trim() !== "" && newComment.trim() !== "") {
			const newForum = {
				id: forums.length + 1,
				title: newForumTitle,
				author: loggedInUser,
				createdAt: new Date().toLocaleString(),
				comments: [
					{
						text: newComment,
						author: loggedInUser,
						createdAt: new Date().toLocaleString(),
						file: uploadedFile, // Add file to comment
					},
				],
			};
			setForums([...forums, newForum]);
			setMyForums([...myForums, newForum]); // Add the forum to the "My Discussions" list
			setNewForumTitle("");
			setNewComment("");
			setUploadedFile(null);
			setShowCreateForum(false);
		}
	};

	const addComment = (forumId) => {
		if (newComment.trim() !== "") {
			const updatedForums = forums.map((forum) => {
				if (forum.id === forumId) {
					const updatedComments = [
						...forum.comments,
						{
							text: newComment,
							author: loggedInUser,
							createdAt: new Date().toLocaleString(),
							file: uploadedFile, // Add file to comment
						},
					];
					return { ...forum, comments: updatedComments };
				}
				return forum;
			});

			setForums(updatedForums);
			setNewComment("");
			setUploadedFile(null);
			setSelectedForum(updatedForums.find((f) => f.id === forumId));
		}
	};

	const handleCommentKeyPress = (e, forumId) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			addComment(forumId);
		}
	};

	const openForum = (forum) => {
		if (selectedForum && selectedForum.id === forum.id) {
			setSelectedForum(null);
		} else {
			setSelectedForum(forum);
		}
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setUploadedFile(file);
		}
	};

	const handleFileDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) {
			setUploadedFile(file);
		}
	};

	const toggleAllForums = () => {
		setShowAllForums(!showAllForums);
		setShowCreateForum(false);
		setShowFavorites(false);
		setShowCreatedByMe(false);
	};

	const toggleFavorite = (forumId) => {
		if (favorites.includes(forumId)) {
			setFavorites(favorites.filter((id) => id !== forumId));
		} else {
			setFavorites([...favorites, forumId]);
		}
	};

	const toggleFavoritesView = () => {
		setShowFavorites(!showFavorites);
		setShowAllForums(false);
		setShowCreatedByMe(false);
	};

	const handleMyDiscussionsClick = () => {
		setShowCreatedByMe(true);
		setShowAllForums(false);
		setShowFavorites(false);
	};

	const deleteForum = (forumId) => {
		if (userRole === "admin") {
			const updatedForums = forums.filter((forum) => forum.id !== forumId);
			setForums(updatedForums);
			setMyForums(myForums.filter((forum) => forum.id !== forumId)); // Also update 'My Discussions' if needed
			alert("Forum deleted successfully!");
		} else {
			alert("You do not have permission to delete this forum.");
		}
	};

	return (
		<div className="forum-container">
			<button className="open-sidebar" onClick={toggleSidebar}>
				☰
			</button>

			<div className={`forum-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
				<button
					className="forum-button"
					onClick={() => {
						setShowCreateForum(true);
						setShowAllForums(false);
						setShowFavorites(false);
						setShowCreatedByMe(false);
					}}
				>
					Start a Discussion
				</button>
				<button className="forum-button small-button" onClick={toggleAllForums}>
					<span className="forum-icon">💬</span>
					All Discussions
				</button>

				<button className="forum-button small-button" onClick={toggleFavoritesView}>
					<span className="forum-icon">⭐</span>
					Favorites
				</button>

				<button className="forum-button small-button" onClick={handleMyDiscussionsClick}>
					<span className="forum-icon">📝</span>
					My Discussions
				</button>
				<button className="close-sidebar" onClick={toggleSidebar}>
					X
				</button>
			</div>

			<div className="forum-main">
				<h1>Forum</h1>

				{showWelcomeMessage && (
					<div className="welcome-message">
						<h3>
							Pozdrav svima! Dobrodošli na forum! Ovdje imate priliku kreirati vlastite teme, postavljati pitanja, ali i komentirati forume koje su kreirali vaši kolege studenti. Ovaj forum je mjesto
							na kojem možete r azmjenjivati mišljenja, diskutirati o temama vezanim uz fakultet, predmete, kolokvije i sve što vas zanima. Iskoristite ga kao platformu za povezivanje s drugima, bilo
							da su već studenti ili tek planiraju postati. Želimo vam puno uspjeha i zanimljivih rasprava!
						</h3>
						<button onClick={dismissWelcomeMessage}>Nemoj više prikazivati ovu poruku</button>
					</div>
				)}

				{showCreateForum && loggedInUser && (
					<div className="forum-create-form">
						<h2>Create a new forum</h2>
						<input type="text" placeholder="Enter forum title" value={newForumTitle} onChange={(e) => setNewForumTitle(e.target.value)} className="forum-input" />
						<textarea placeholder="Enter forum text" value={newComment} onChange={(e) => setNewComment(e.target.value)} className="forum-input" />

						{/* File upload */}
						<div className="file-upload-container">
							<label htmlFor="file-upload" className="file-upload-label">
								<span>📎</span> Attach a file
							</label>
							<input id="file-upload" type="file" onChange={handleFileUpload} className="file-upload-input" />
							<div className="file-info">{uploadedFile ? <p className="file-name">{uploadedFile.name}</p> : <p className="no-file-chosen">No file chosen</p>}</div>
						</div>

						<button onClick={() => createForum()} className="forum-submit">
							Create
						</button>
					</div>
				)}
				{showFavorites && (
					<div>
						<h2>Favorites</h2>
						{favorites.length === 0 ? (
							<p>No favorite forums yet.</p>
						) : (
							forums
								.filter((forum) => favorites.includes(forum.id))
								.map((forum) => (
									<div key={forum.id} className="forum-item" onClick={() => openForum(forum)}>
										<h3>{forum.title}</h3>
										<p>{forum.comments.length} comments</p>
										<button
											className="favorites-item-remove"
											onClick={(e) => {
												e.stopPropagation();
												toggleFavorite(forum.id);
											}}
										>
											Remove from favorites
										</button>
									</div>
								))
						)}
					</div>
				)}

				{showAllForums && (
					<div>
						<h2>Forum List</h2>
						{forums.map((forum) => (
							<div key={forum.id} className="forum-item" onClick={() => openForum(forum)}>
								<h3>{forum.title}</h3>
								<p>{forum.comments.length} comments</p>
								{userRole === "admin" && (
									<button
										className="delete-forum-button"
										onClick={(e) => {
											e.stopPropagation();
											deleteForum(forum.id);
										}}
									>
										Delete Forum
									</button>
								)}
								<button
									className="favorites-item-add"
									onClick={(e) => {
										e.stopPropagation();
										toggleFavorite(forum.id);
									}}
								>
									{favorites.includes(forum.id) ? "Remove from favorites" : "Add to favorites"}
								</button>
							</div>
						))}
					</div>
				)}

				{showCreatedByMe && (
					<div>
						<h2>My Discussions</h2>
						{myForums.length === 0 ? (
							<p>No forums created yet.</p>
						) : (
							myForums.map((forum) => (
								<div key={forum.id} className="forum-item" onClick={() => openForum(forum)}>
									<h3>{forum.title}</h3>
									<p>{forum.comments.length} comments</p>
								</div>
							))
						)}
					</div>
				)}

				{/* Display file in comments */}
				{selectedForum && (
					<div className="forum-details">
						<h2>{selectedForum.title}</h2>
						<p>
							Created by: <b>{selectedForum.author}</b>, Created at: <i>{selectedForum.createdAt}</i>
						</p>
						<p>Total comments: {selectedForum.comments.length}</p>
						<div>
							<h4>Comments:</h4>
							{selectedForum.comments.length === 0 ? (
								<p>No comments yet.</p>
							) : (
								selectedForum.comments.map((comment, index) => (
									<div key={index} className="comment">
										<p>
											<b>{comment.author}</b> ({comment.createdAt}): {comment.text}
										</p>
										{comment.file && (
											<div className="file-preview">
												<p>
													File:{" "}
													<a href={URL.createObjectURL(comment.file)} download>
														{comment.file.name}
													</a>
												</p>
											</div>
										)}
									</div>
								))
							)}
						</div>
						<div className="comment-input">
							{loggedInUser && (
								<>
									<textarea placeholder="Enter a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => handleCommentKeyPress(e, selectedForum.id)} />
									<div className="file-upload-container">
										<label htmlFor="file-upload" className="file-upload-label">
											<span>📎</span> Attach a file
										</label>
										<input id="file-upload" type="file" onChange={handleFileUpload} className="file-upload-input" />
										<div className="file-info">{uploadedFile ? <p className="file-name">{uploadedFile.name}</p> : <p className="no-file-chosen">No file chosen</p>}</div>
									</div>

									<button onClick={() => addComment(selectedForum.id)} className="comment-submit">
										Post comment
									</button>
								</>
							)}
							{!loggedInUser && <p>You must be logged in to comment.</p>}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Forum;
