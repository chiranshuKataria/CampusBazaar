// Signup.jsx
import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import API_URL from "../constant";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleApi = async (e) => {
  e.preventDefault();
  if (!username || !password) {
    alert("❌ Please enter both username and password");
    return;
  }

  setLoading(true);
  try {
    const url = API_URL+"/signup";
    const data = { username, password };

    const res = await axios.post(url, data);

    if (res.status === 200) {
      // existing user login
      const { token, userId } = res.data;   // 👈 get both
      if (token && userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);   // 👈 store userId too
        alert(res.data.message || "✅ Login successful");
        navigate("/");
      }
    } else if (res.status === 201) {
      // new signup → go to login page (don't auto login)
      alert(res.data.message || "✅ Account created. Please login now.");
      navigate("/login");
    }
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      const payload = err.response.data || {};
      if (status === 401) {
        alert(payload.error || "❌ Wrong password");
      } else if (status === 400) {
        alert(payload.error || "❌ Bad request");
      } else if (status === 409) {
        alert(payload.error || "❌ Username already exists");
      } else {
        alert(payload.error || "❌ Something went wrong. Please try again.");
      }
    } else {
      console.error("Signup network/error:", err);
      alert(err.message || "❌ Network error. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="p-3 d-flex flex-column justify-content-center align-items-center card mx-auto w-50 shadow-lg">
        <h2>Welcome to Signup</h2>
        <form onSubmit={handleApi} className="w-100">
          <label className="text-center d-block">Enter Username</label>
          <input
            id="usernameInput"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control mb-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('passwordInput').focus();
              }
            }}
          />

          <label className="text-center d-block">Enter Password</label>
          <input
            id="passwordInput"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-2"
          />

          <div className="d-flex justify-content-center mt-3">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-outline-primary w-100"
            >
              {loading ? "Signing up..." : "SIGNUP"}
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Signup;
