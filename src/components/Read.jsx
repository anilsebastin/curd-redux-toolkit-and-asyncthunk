import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

function Read() {
  const [id, setId] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [radioData, setRadioData] = useState("");

  const dispatch = useDispatch();

  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      World User Data
      <br />
      <br />
      All Users
      <input
        name="gender"
        value=""
        checked={radioData === ""}
        className="form-check-input"
        type="radio"
        onChange={(e) => setRadioData("")}
      />
      <br />
      Male
      <input
        name="gender"
        value="Male"
        checked={radioData === "Male"}
        className="form-check-input"
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <br />
      Female
      <input
        name="gender"
        value="Female"
        checked={radioData === "Female"}
        className="form-check-input"
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <div style={{ padding: "20px" }}>
        {users &&
          users
            .filter((element) => {
              if (searchData.length == 0) {
                return element;
              } else {
                return element.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })

            .filter((element) => {
              if (radioData === "Male") {
                return element.gender === "Male";
              } else if (radioData === "Female") {
                return element.gender === "Female";
              } else {
                return element;
              }
            })

            .map((user) => (
              <div
                key={user.id}
                className="card my-2"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    {user.email}, {user.age}, {user.gender}
                  </p>
                  <button
                    onClick={() => [setId(user.id), setShowPopup(true)]}
                    className="card-link"
                  >
                    View
                  </button>
                  <Link to={`/edit/${user.id}`} className="card-link">
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="card-link"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Read;
