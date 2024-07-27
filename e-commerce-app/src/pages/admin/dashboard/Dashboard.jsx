import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashBoard = () => {
  let currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="card mb-5">
      <div className="card-header d-flex justify-content-between">
        <h5>Dashboard</h5>
        <Link to="/admin/dashboard/edit-profile" className="primary-btn">
          Edit Profile
        </Link>
      </div>
      <div className="card-body">
        <p className="border-bottom fw-semibold">Name: {currentUser.name}</p>
        <p className="border-bottom fw-semibold">Email: {currentUser.email}</p>
        <p className="border-bottom fw-semibold">
          Contact Number: {currentUser.contact}
        </p>
        <p className="border-bottom fw-semibold">
          Image:{" "}
          <img src={currentUser.image} alt={currentUser.name} height={50} />
        </p>
        <p className="border-bottom fw-semibold">Role: {currentUser.role}</p>
      </div>
    </div>
  );
};

export default DashBoard;
