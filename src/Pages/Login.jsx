import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContextValue";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (!login(email, password)) {
      setError("Invalid email or password.");
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Login to continue planning your next trip.</p>
        {location.state?.message && <div className="success-box">{location.state.message}</div>}
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group"><label htmlFor="login-email">Email</label><input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
          <div className="input-group"><label htmlFor="login-password">Password</label><input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
          <button className="plan-button auth-submit" type="submit">Login</button>
        </form>
        <p className="auth-link-text">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </section>
  );
}

export default Login;