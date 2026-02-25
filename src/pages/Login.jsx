import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    const success = login(form.email, form.password);

    if (!success) {
      setError("Invalid credentials");
      return;
    }

    navigate("/");
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Welcome Back
        </h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {error && (
          <p style={{ color: "#ef4444", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <button
          className="primary"
          style={{ width: "100%", marginBottom: "10px" }}
          onClick={handleLogin}
        >
          Login
        </button>

<button className="secondary" onClick={() => navigate("/register")}>
  Create Account
</button>
      </div>
    </div>
  );
}