import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const dropdownRef = useRef();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    upiId: user?.upiId || "",
  });
  useEffect(() => {
  if (user) {
    setProfileData({
      name: user.name,
      upiId: user.upiId,
    });
  }
}, [user]);
  const activeStyle = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };
const handleSave = () => {
  const updatedUser = {
    ...user,
    ...profileData,
  };

  // 1️⃣ Update Context
  dispatch({
    type: "UPDATE_PROFILE",
    payload: profileData,
  });

  // 2️⃣ Update currentUser in localStorage
  localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
  );

  // 3️⃣ Update users array in localStorage
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((u) =>
    u.id === user.id ? updatedUser : u
  );

  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );

  setEditMode(false);
};

  // Close dropdown outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
        setEditMode(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () =>
      document.removeEventListener("click", handleClick);
  }, []);

  if (!user) return null;

  return (
    <header className="header-clean">
      {/* Left Section */}
      <div className="nav-left">
        <h2 className="logo">SplitSmart</h2>

        <NavLink to="/" className={activeStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/friends" className={activeStyle}>
          Friends
        </NavLink>
        <NavLink to="/analytics" className={activeStyle}>
          Analytics
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="profile-wrapper" ref={dropdownRef}>
 <div
  className="avatar"
  onClick={(e) => {
    e.stopPropagation();   // ✅ prevents bubbling
    setOpen(!open);
  }}
>
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div className={`dropdown-animated ${open ? "show" : ""}`}>
          {!editMode ? (
            <>
              <p className="dropdown-name">{user.name}</p>
              <p className="dropdown-email">{user.email}</p>
              <p className="dropdown-upi">
                UPI: {user.upiId}
              </p>

              <button
  className="edit-btn"
  onClick={(e) => {
    e.stopPropagation();   // ✅ prevents dropdown close
    setEditMode(true);
  }}
>
  Edit Profile
</button>

              <button
                className="danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <input
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    name: e.target.value,
                  })
                }
              />

              <input
                value={profileData.upiId}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    upiId: e.target.value,
                  })
                }
              />

              <button
                className="primary full"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}