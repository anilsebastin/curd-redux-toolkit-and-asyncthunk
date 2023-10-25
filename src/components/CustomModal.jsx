import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";

const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const allUsers = useSelector((state) => state.app.users);
  const user = allUsers.find((usr) => usr.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>X</button>
        <h2>Name: {user.name}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Age: {user.age}</h2>
        <h2>Gender: {user.gender}</h2>
      </div>
    </div>
  );
};

export default CustomModal;
