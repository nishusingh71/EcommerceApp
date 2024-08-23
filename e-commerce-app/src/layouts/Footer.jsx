import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <>
      <footer className={`footer spad container-fluid mt-5 py-4 ${styles.footer}`}>
        <div className="footer__copyright d-flex justify-content-center">
          <div className="footer__copyright__text">
            <p>
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script> All
              rights reserved |Project Made
              <i className="fa fa-heart" aria-hidden="true"></i> by Nishu Singh
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
