import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Friends() {
  const { state, dispatch } = useContext(AppContext);

  const nameRef = useRef();
  const upiRef = useRef();

  const [editId, setEditId] = useState(null);

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

  const updateFriend = () => {
    dispatch({
      type: "UPDATE_FRIEND",
      payload: {
        id: editId,
        name: nameRef.current.value,
        upiId: upiRef.current.value,
      },
    });

    setEditId(null);
    nameRef.current.value = "";
    upiRef.current.value = "";
  };

  const deleteFriend = (id) => {
    dispatch({
      type: "DELETE_FRIEND",
      payload: id,
    });
  };

  const editFriend = (friend) => {
    setEditId(friend.id);
    nameRef.current.value = friend.name;
    upiRef.current.value = friend.upiId;
  };

  return (
    <div className="container">
      <div className="card">
        <h3>{editId ? "Edit Friend" : "Add Friend"}</h3>

        <input ref={nameRef} placeholder="Friend Name" />
        <input ref={upiRef} placeholder="Friend UPI ID" />

        {editId ? (
          <button className="primary" onClick={updateFriend}>
            Update Friend
          </button>
        ) : (
          <button className="primary" onClick={addFriend}>
            Add Friend
          </button>
        )}
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
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div>
                <strong>{f.name}</strong>
                <p style={{ fontSize: "12px", color: "#64748b" }}>
                  UPI: {f.upiId}
                </p>
              </div>

              {/* ✅ Edit + Delete Buttons */}
              <div>
                <button
                  style={{ marginRight: "8px" }}
                  onClick={() => editFriend(f)}
                >
                  Edit
                </button>

                <button
                  className="danger"
                  onClick={() => deleteFriend(f.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}