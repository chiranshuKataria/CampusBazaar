// Footer.jsx
function Footer() {
    return (
        <div className="mt-auto">   {/* 👈 ensures it sticks at the bottom */}
            {/* Back to top button */}
            <a
                id="navBackToTop"
                href="#top"
                aria-label="Back to top"
                role="button"
                className="d-block w-100 text-center py-3 bg-black text-white fw-bold mt-5 text-decoration-none"
            >
                <span>Back to top</span>
            </a>

            {/* Footer in grey */}
            <footer className="bg-light text-center border-top">
                <div className="container-fluid py-3 d-flex justify-content-center">
                    <p className="mb-0 text-secondary fw-semibold">
                        © {new Date().getFullYear()} Campus Bazaar | Built with ❤️ at IIT Kanpur
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
