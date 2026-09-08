import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContextValue";

function Signup() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    register({ name: form.name.trim(), email: form.email.trim(), password: form.password });
    navigate("/login", { state: { message: "Account created successfully. Please login." }, replace: true });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="auth-subtitle">Join StayNest and plan smarter trips.</p>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group"><label htmlFor="signup-name">Full Name</label><input id="signup-name" name="name" value={form.name} onChange={updateField} required /></div>
          <div className="input-group"><label htmlFor="signup-email">Email</label><input id="signup-email" name="email" type="email" value={form.email} onChange={updateField} required /></div>
          <div className="input-group"><label htmlFor="signup-password">Password</label><input id="signup-password" name="password" type="password" value={form.password} onChange={updateField} required /></div>
          <div className="input-group"><label htmlFor="signup-confirm-password">Confirm Password</label><input id="signup-confirm-password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} required /></div>
          <button className="plan-button auth-submit" type="submit">Create Account</button>
        </form>
        <p className="auth-link-text">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </section>
  );
}

export default Signup;