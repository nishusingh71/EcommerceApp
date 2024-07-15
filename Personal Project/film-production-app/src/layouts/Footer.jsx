import React from "react";
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
export default function Footer() {
  return (
    <>
      <div className="container my-5">
        <footer
          className="text-center text-lg-start"
          style={{ backgroundColor: " #db6930;" }}
        >
          {/* <div className="container d-flex justify-content-center py-5">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: " #54456b;" }}
            >
              <FontAwesomeIcon icon="fab fa-facebook-f" />
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: " #54456b;" }}
            >
              <i className="fab fa-youtube"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: " #54456b;" }}
            >
              <i className="fab fa-instagram"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: " #54456b;" }}
            >
              <i className="fab fa-twitter"></i>
            </button>
          </div> */}
          <div
            className="text-center text-white"
            style={{ backgroundColor: " rgba(0, 0, 0, 0.2);" }}
          >
            © 2024 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">
              Production
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
