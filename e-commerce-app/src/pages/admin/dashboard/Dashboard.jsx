import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const Dashboard = () => {
  let currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Dashboard</h5>
        <Link to="/admin/edit-profile" className="primary-btn  text-white">
          Edit Profile
        </Link>
      </div>
      <div className="card-body">
        <p className="border-bottom">Name : {currentUser.name}</p>
        <p className="border-bottom">Email : {currentUser.email}</p>
        <p className="border-bottom">Contact Number : {currentUser.contact}</p>
        <p className="border-bottom">
          Image :{" "}
          <img src={currentUser.image} alt={currentUser.name} height={"50"} />
        </p>
        <p className="border-bottom">Role : {currentUser.role}</p>
      </div>
    </div>
  );
};

export default Dashboard;
