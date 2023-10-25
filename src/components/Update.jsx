import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

function Update() {
  const [userData, setUserData] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const user = users.filter((usr) => usr.id === id);
      setUserData(user[0]);
    }
  }, []);

  const handleUpdate = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    navigate("/read");
  };

  return (
    <form className="w-50 mx-auto" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={userData && userData.name}
          onChange={handleUpdate}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={userData && userData.email}
          onChange={handleUpdate}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Age</label>
        <input
          type="text"
          className="form-control"
          name="age"
          value={userData && userData.age}
          onChange={handleUpdate}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <input
          name="gender"
          onChange={handleUpdate}
          value="Male"
          checked={userData && userData.gender === "Male"}
          className="form-check-input"
          type="radio"
        />
        <label className="form-check-label">Male</label>
      </div>
      <div className="mb-3">
        <input
          name="gender"
          onChange={handleUpdate}
          value="Female"
          checked={userData && userData.gender === "Female"}
          className="form-check-input"
          type="radio"
        />
        <label className="form-check-label">Female</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
}

export default Update;
