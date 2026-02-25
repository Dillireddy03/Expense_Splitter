import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    upiId: "",
  });

  const handleSubmit = () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Email and Password required");
      return;
    }

    if (isLogin) {
      const success = login(form.email, form.password);
      if (!success) {
        setError("Invalid credentials");
        return;
      }
      navigate("/");
    } else {
      if (!form.name || !form.upiId) {
        setError("All fields required");
        return;
      }

const success = register(form);

if (!success) {
  setError("User already exists");
  return;
}


const loggedIn = login(form.email, form.password);
if (loggedIn) {
  navigate("/");
}
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-card ${isLogin ? "" : "active"}`}>
        {/* Toggle Buttons */}
        <div className="toggle-container">
          <button
            className={isLogin ? "toggle active" : "toggle"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "toggle active" : "toggle"}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
          <div className={`slider ${isLogin ? "" : "move"}`} />
        </div>

        {/* Form */}
        <div className="form-container">
          {!isLogin && (
            <>
              <input
                placeholder="Full Name"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <input
                placeholder="UPI ID"
                onChange={(e) =>
                  setForm({ ...form, upiId: e.target.value })
                }
              />
            </>
          )}

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

          {error && <p className="error">{error}</p>}

          <button className="primary full" onClick={handleSubmit}>
            {isLogin ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}