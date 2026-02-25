import { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";

export default function Friends() {
  const { state, dispatch } = useContext(AppContext);
  const nameRef = useRef();
  const upiRef = useRef();

  const addFriend = () => {
    if (!nameRef.current.value || !upiRef.current.value) return;

    dispatch({
      type: "ADD_FRIEND",
      payload: {
        id: Date.now(),
        name: nameRef.current.value,
        upiId: upiRef.current.value,
      },
    });

    nameRef.current.value = "";
    upiRef.current.value = "";
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Add Friend</h3>

        <input ref={nameRef} placeholder="Friend Name" />
        <input ref={upiRef} placeholder="Friend UPI ID" />

        <button className="primary" onClick={addFriend}>
          Add Friend
        </button>
      </div>

      {state.friends.length === 0 ? (
        <div className="empty">No friends added</div>
      ) : (
        <div className="card">
          {state.friends.map((f) => (
            <div
              key={f.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div>
                <strong>{f.name}</strong>
                <p style={{ fontSize: "12px", color: "#64748b" }}>
                  UPI: {f.upiId}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}