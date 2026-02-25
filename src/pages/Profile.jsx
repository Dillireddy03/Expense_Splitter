import { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";

export default function Profile() {
  const { state, dispatch } = useContext(AppContext);
  const nameRef = useRef();

  const updateProfile = () => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { name: nameRef.current.value },
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Profile</h3>
        <p>Email: {state.user?.email}</p>

        <input
          ref={nameRef}
          defaultValue={state.user?.name}
        />

        <button className="primary" onClick={updateProfile}>
          Save Changes
        </button>
      </div>
    </div>
  );
}