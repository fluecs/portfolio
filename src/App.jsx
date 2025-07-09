import React, { useState } from "react";
import articlesData from "./assets/articles.json";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function App() {
	const [selectedArticle, setSelectedArticle] = useState(null);
	const [overlayOpen, setOverlayOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('about');

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

	const renderSection = () => {
		switch (activeSection) {
			case 'about':
				return (
					<div className="section-content">
						<h2>About Me</h2>
						<div className="about-content">
							<div className="about-text">
								<p>Hi! I'm Ilia Videv, a passionate developer who loves building things from the ground up. I specialize in systems programming, web development, and creating educational projects that push the boundaries of what's possible.</p>
								<p>When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing my knowledge through blog posts and tutorials.</p>
								<p>I believe in "coding with vibe" - creating software that's not just functional, but enjoyable to build and use.</p>
							</div>
							<div className="about-stats">
								<div className="stat">
									<h3>3+</h3>
									<p>Years Experience</p>
								</div>
								<div className="stat">
									<h3>10+</h3>
									<p>Projects Completed</p>
								</div>
								<div className="stat">
									<h3>5+</h3>
									<p>Technologies Mastered</p>
								</div>
							</div>
						</div>
					</div>
				);
			case 'skills':
				return (
					<div className="section-content">
						<h2>Skills & Technologies</h2>
						<div className="skills-grid">
							<div className="skill-category">
								<h3>Systems Programming</h3>
								<div className="skill-items">
									<span className="skill-item">C/C++</span>
									<span className="skill-item">Assembly</span>
									<span className="skill-item">OS Development</span>
									<span className="skill-item">Kernel Programming</span>
									<span className="skill-item">Driver Development</span>
								</div>
							</div>
							<div className="skill-category">
								<h3>Embedded Systems</h3>
								<div className="skill-items">
									<span className="skill-item">Embedded Systems</span>
									<span className="skill-item">Microcontrollers</span>
									<span className="skill-item">Microprocessors</span>
									<span className="skill-item">Microcontrollers</span>
								</div>
							</div>
							<div className="skill-category">
								<h3>Web Development</h3>
								<div className="skill-items">
									<span className="skill-item">React</span>
									<span className="skill-item">Node.js</span>
									<span className="skill-item">JavaScript</span>
									<span className="skill-item">MariaDB</span>
									<span className="skill-item">PhP</span>
									<span className="skill-item">MySQL</span>
								</div>
							</div>
							<div className="skill-category">
								<h3>Tools & Others</h3>
								<div className="skill-items">
									<span className="skill-item">Git</span>
									<span className="skill-item">VM Software</span>
									<span className="skill-item">Linux</span>
									<span className="skill-item">Windows</span>
								</div>
							</div>
						</div>
					</div>
				);
			case 'projects':
				return (
					<div className="section-content">
						<h2>Featured Projects</h2>
						<div className="projects-grid">
							{articlesData.map((article) => (
								<div
									key={article.id}
									className="project-card"
									onClick={() => openArticle(article)}
								>
									<div className="project-image-wrapper">
										<img src={article.image} alt={article.title} className="project-image" />
										<div className="project-overlay">
											<h3>{article.title}</h3>
											<p>Click to read more</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				);
			case 'contact':
				return (
					<div className="section-content">
						<h2>Get In Touch</h2>
						<div className="contact-content">
							<div className="contact-info">
								<div className="contact-item">
									<h3>Email</h3>
									<p>ilciliadev@gmail.com</p>
								</div>
								<div className="contact-item">
									<h3>GitHub</h3>
									<p>https://github.com/fluecs</p>
								</div>
							</div>
							<div className="contact-message">
								<p>I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to chat about technology, feel free to reach out!</p>
							</div>
						</div>
					</div>
				);
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
			
			<nav className="navigation">
				<button 
					className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
					onClick={() => setActiveSection('about')}
				>
					About
				</button>
				<button 
					className={`nav-btn ${activeSection === 'skills' ? 'active' : ''}`}
					onClick={() => setActiveSection('skills')}
				>
					Skills
				</button>
				<button 
					className={`nav-btn ${activeSection === 'projects' ? 'active' : ''}`}
					onClick={() => setActiveSection('projects')}
				>
					Projects
				</button>
				<button 
					className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`}
					onClick={() => setActiveSection('contact')}
				>
					Contact
				</button>
			</nav>

			<main className="main-content">
				{renderSection()}
			</main>

			{/* Overlay for blog post */}
			{overlayOpen && selectedArticle && (
				<div className="overlay" onClick={closeOverlay}>
					<div className="overlay-content" onClick={e => e.stopPropagation()}>
						<img src={selectedArticle.image} alt={selectedArticle.title} className="overlay-image" />
						<h2 className="overlay-title">{selectedArticle.title}</h2>
						<div className="overlay-article-content">
							{selectedArticle.content.map((block, idx) => renderContentBlock(block, idx))}
						</div>
						<button className="close-btn" onClick={closeOverlay}>&times;</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
