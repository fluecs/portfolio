import React, { useState } from "react";
import articlesData from "./assets/articles.json";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function App() {
	const [selectedArticle, setSelectedArticle] = useState(null);
	const [overlayOpen, setOverlayOpen] = useState(false);

	const openArticle = (article) => {
		setSelectedArticle(article);
		setOverlayOpen(true);
	};

	const closeOverlay = () => {
		setOverlayOpen(false);
		setSelectedArticle(null);
	};

	const renderContentBlock = (block, idx) => {
		switch (block.type) {
			case "heading":
				if (block.level === 2) return <h2 key={idx}>{block.text}</h2>;
				if (block.level === 3) return <h3 key={idx}>{block.text}</h3>;
				return <h4 key={idx}>{block.text}</h4>;
			case "paragraph":
				return <p key={idx}>{block.text}</p>;
			case "image":
				return <img key={idx} src={block.src} alt={block.alt || ""} className="article-image" />;
			default:
				return null;
		}
	};
	
	articlesData.sort((a, b) => b.id - a.id);
	

	return (
		<div className="app-root">
			<header className="top-bar">
				<div className="name">Ilia Videv</div>
				<div className="quote">"I'm not vibe coding, but coding with vibe"</div>
			</header>
			<main className="main-content">
				{/* Blog grid will go here */}
				<div className="blog-grid">
					{articlesData.map((article) => (
						<div
							key={article.id}
							className="blog-card"
							onClick={() => openArticle(article)}
						>
							<div className="blog-card-image-wrapper">
								<img src={article.image} alt={article.title} className="blog-card-image" />
								<div className="blog-card-title-gradient">
									<span className="blog-card-title">{article.title}</span>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* Overlay for blog post */}
				{overlayOpen && selectedArticle && (
					<div className="overlay" onClick={closeOverlay}>
						<div className="promax">
							<div className="overlay-content" onClick={e => e.stopPropagation()}>
								<img src={selectedArticle.image} alt={selectedArticle.title} className="overlay-image" />
								<h2 className="overlay-title">{selectedArticle.title}</h2>
								<div className="overlay-article-content">
									{selectedArticle.content.map((block, idx) => renderContentBlock(block, idx))}
								</div>
								<button className="close-btn" onClick={closeOverlay}><FontAwesomeIcon icon={faXmark} /></button>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
