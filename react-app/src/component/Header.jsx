// import './Header.css';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" data-bs-theme="light">
            <div className="container-fluid d-flex align-items-center justify-content-between">

                {/* Brand */}
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <img
                        src="images/Campus_Bazar_logo.png"
                        alt="Logo"
                        width="40"
                        height="30"
                        className="d-inline-block align-text-top"
                    />
                    <span className="ms-2">Bazaaar</span>
                </Link>

                {/* Search bar (only on home page) */}
                {location.pathname === "/" && (
                    <form
                        className="input-group mx-3 flex-grow-1 flex-md-grow-0"
                        style={{ maxWidth: "35%" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            props.handleclick && props.handleclick();
                        }}
                    >
                        {/* Category Dropdown inside input-group */}
                        <button
                            className="btn btn-outline-primary dropdown-toggle"
                            type="button"
                            id="categoryDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {props.selectedCategory || "All"}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => props.handleCategorySelect("")}
                                >
                                    All Categories
                                </button>
                            </li>
                            {props.categories.map((cat, idx) => (
                                <li key={idx}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => props.handleCategorySelect(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Search Input */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={props?.search || ""}
                            onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();       // stop refresh
                                    props.handleclick && props.handleclick();
                                }
                            }}
                        />

                        {/* Search Button */}
                        <button className="btn btn-outline-primary" type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>

                )}

                {/* Navbar toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Offcanvas menu */}
                <div className="offcanvas offcanvas-end" id="offcanvasNavbar">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Menu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="navbar-nav d-flex align-items-center gap-2 ms-auto">
                            <Link className="nav-link getNavLinkClass" to="/">Home</Link>
                            <Link className="nav-link" to="/addproduct">Sell</Link>
                            <Link className="nav-link" to="/likedproducts">Liked</Link>
                            <Link className="nav-link" to="/cart">Cart</Link>
                            <Link className="nav-link" to="/aboutus">About Us</Link>

                            {!token && location.pathname !== "/login" && (
                                <Link className="btn btn-outline-success me-2 mt-2" to="/login">Login</Link>
                            )}
                            {!token && location.pathname !== "/signup" && (
                                <Link className="btn btn-outline-success me-2 mt-2" to="/signup">Signup</Link>
                            )}
                            {token && (
                                <button className="btn btn-danger mt-2" onClick={handleLogout}>Logout</button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Header;
