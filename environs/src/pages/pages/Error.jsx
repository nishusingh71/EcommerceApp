import React from "react";
import { NavLink } from "react-router-dom";
export default function Error() {
  return (
    <>
      <div class="container-fluid bg-breadcrumb">
        <div class="container text-center py-5" style={{ maxWidth: " 900px;" }}>
          <h1 class="text-white display-3 mb-4">404 Pages</h1>
          <p class="fs-5 text-white mb-4">Oops! Page Not Found</p>
          <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li class="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li class="breadcrumb-item active text-white">404</li>
          </ol>
        </div>
      </div>
      <div
        class="container-fluid py-5"
        style={{
          background:
            " linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));",
          objectFit: " cover;",
        }}
      >
        <div class="container py-5 text-center">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <i class="bi bi-exclamation-triangle display-1 text-primary"></i>
              <h1 class="display-1">404</h1>
              <h1 class="mb-4 text-dark">Page Not Found</h1>
              <p class="mb-4 text-dark">
                We’re sorry, the page you have looked for does not exist in our
                website! Maybe go to our home page or try to use a search?
              </p>
              <NavLink class="btn btn-primary btn-hover-bg py-3 px-5" to="/">
                Go Back To Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
