import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    upiId: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password || !form.upiId) {
      setError("All fields are required");
      return;
    }

    const success = register(form);

    if (!success) {
      setError("User already exists");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>

        <input
          placeholder="Full Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

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

        <input
          placeholder="UPI ID (example@upi)"
          onChange={(e) =>
            setForm({ ...form, upiId: e.target.value })
          }
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="primary" onClick={handleSubmit}>
          Create Account
        </button>

        <p style={{ marginTop: "15px" }}>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}