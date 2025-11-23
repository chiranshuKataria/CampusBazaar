import { useEffect } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";



function Aboutus() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container py-5">
                {/* Heading */}
                <h2 className="text-center mb-4 fw-bold">About Us</h2>

                {/* Intro */}
                <p className="lead text-center mx-auto" style={{ maxWidth: "800px" }}>
                    Welcome to <strong>Campus Bazar</strong>, the one-stop marketplace for students at IIT Kanpur
                    to buy and sell second-hand items with ease.
                    <br />
                    We know how quickly student needs change – from books and lab equipment to cycles, gadgets,
                    or even room essentials. Campus Bazar bridges this gap by creating a safe, student-friendly
                    platform where you can exchange goods at fair prices, within your own campus community.
                </p>

                {/* What we offer */}
                <h3 className="mt-5 mb-3 text-center fw-semibold">✨ What We Offer</h3>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col">
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body">
                                <h5 className="fw-bold"><i className="bi bi-upload text-success me-2"></i> Hassle-free Selling</h5>
                                <p className="text-muted">Upload product details and images in minutes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body">
                                <h5 className="fw-bold"><i className="bi bi-search text-primary me-2"></i> Smart Discovery</h5>
                                <p className="text-muted">Browse categories like books, electronics, cycles, furniture, and more.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body">
                                <h5 className="fw-bold"><i className="bi bi-shield-check text-warning me-2"></i> Trust & Safety</h5>
                                <p className="text-muted">Only campus-verified users can post and connect.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body">
                                <h5 className="fw-bold"><i className="bi bi-recycle text-success me-2"></i> Sustainable Choice</h5>
                                <p className="text-muted">By reusing and sharing, we reduce waste and promote a greener campus.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission */}
                <h3 className="mt-5 mb-3 text-center fw-semibold">🎯 Our Mission</h3>
                <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
                    Our mission is to make student life more convenient and affordable by encouraging reuse and making essentials
                    accessible to everyone. We believe in <strong>community</strong>, <strong>trust</strong>, and <strong>sustainability</strong> –
                    and Campus Bazar is built on these values.
                </p>
            </div>

            <div className="container my-5">
                {/* Title */}
                <h1 className="text-center mb-4 fw-bold">About Me</h1>

                {/* Card Section */}
                <div className="d-flex justify-content-center">
                    <div className="card shadow-lg border-0" style={{ maxWidth: "380px", borderRadius: "15px" }}>
                        {/* Profile Image */}
                        <img
                            src="images/chiranshu.jpg"
                            className="card-img-top"
                            alt="Chiranshu Kataria"
                            style={{
                                borderTopLeftRadius: "15px",
                                borderTopRightRadius: "15px",
                                height: "250px",
                                objectFit: "cover"
                            }}
                        />

                        {/* Card Body */}
                        <div className="card-body text-center">
                            <h4 className="card-title fw-semibold">Chiranshu Kataria</h4>
                            <p className="card-text text-muted mb-3">
                                Student at IIT Kanpur <br />
                                Tech Enthusiast | Aspiring Entrepreneur
                            </p>

                            {/* Social Links */}
                            <div className="d-flex justify-content-center gap-4">
                                <a
                                    href="https://www.linkedin.com/in/chiranshu-kataria-5b3959250/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-decoration-none"
                                >
                                    <i className="bi bi-linkedin fs-3 text-primary"></i>
                                </a>
                                <a
                                    href="https://github.com/chiranshuKataria"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-decoration-none"
                                >
                                    <i className="bi bi-github fs-3 text-dark"></i>
                                </a>
                                <a href="mailto:kataria22@email.com" className="text-decoration-none">
                                    <i className="bi bi-envelope-fill fs-3 text-danger"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Aboutus;