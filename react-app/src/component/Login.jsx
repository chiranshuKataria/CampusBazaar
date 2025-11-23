import { useState } from "react";
import Header from "./Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import API_URL from "../constant";


function Login() {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("❌ Please enter both username and password");
            return;
        }

        setLoading(true);

        try {
            const url = API_URL+"/login";
            const data = { username, password }

            const res = await axios.post(url, data);

            console.log("✅ Login success:", res.data)
            alert(res.data.message);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.userId)
                navigate('/')
            }

        } catch (err) {
            if (err.response && err.response.data) {
                console.error("❌ Login failed:", err.response.data.error);
                alert(err.response.data.error);
            } else {
                console.error("❌ Unexpected error:", err.message);
                alert("Something went wrong. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="p-3 d-flex flex-column justify-content-center align-items-center card mx-auto w-50 shadow-lg  ">
                <h2>Welcome to Login</h2>
                <form onSubmit={handlelogin} className="w-100">
                    <label className="text-center d-block">Enter Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className="form-control mb-2"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();       // prevent form submission
                                document.getElementById('passwordInput').focus(); // move focus
                            }
                        }}
                    />

                    <label className="text-center d-block">Enter Password</label>
                    <input
                        id="passwordInput"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="form-control mb-2"
                    />

                    <div className="d-flex justify-content-center mt-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-outline-primary w-100"
                        >
                            {loading ? "Logging in..." : "LOGIN"}
                        </button>
                    </div>
                </form>

            </div>
            {/* <Link to="/signup">SIGNUP</Link> */}
            <Footer/>
        </div>
    );
}

export default Login;