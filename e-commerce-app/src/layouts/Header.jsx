import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategoryStart } from "../redux/actions/category.actions";

const Header = () => {
  const categories = useSelector((state) => state.category.categories);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const getCategory = useCallback(() => {
    dispatch(getCategoryStart());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length !== 0) {
      getCategory();
    }
  }, [categories.length, getCategory]);

  return (
    <>
      {/* <!-- Page Preloder --> */}
      <div id="preloder">
        <div className="loader"></div>
      </div>

      {/* <!-- Humberger Begin --> */}
      <div className="humberger__menu__overlay"></div>
      <div className="humberger__menu__wrapper">
        <>
          <div className="humberger__menu__logo">
            <Link to="/">
              <img src="img/logo.png" alt="" />
            </Link>
          </div>
        </>

        {currentUser.name && (
          <>
            <div className="humberger__menu__cart">
              <ul>
                <li>
                  <Link to="#">
                    <i className="fa fa-heart"></i> <span>1</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag"></i> <span>3</span>
                  </Link>
                </li>
              </ul>
              <div className="header__cart__price">
                item: <span>$150.00</span>
              </div>
            </div>
          </>
        )}

        <div className="humberger__menu__widget">
          {!currentUser.name && (
            <>
              <div className="header__top__right__auth">
                <Link to="/login">
                  <i className="fa fa-user"></i> Login
                </Link>
              </div>
            </>
          )}
          {currentUser.name && (
            <>
              <div className="header__top__right__auth">
                <Link
                  to="/admin/dashboard"
                  style={{ fontSize: "12sp" }}
                  className="text-center mt-2"
                >
                  <div
                    style={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      width: "50px",
                      height: "50px",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={currentUser.image}
                      alt={currentUser.name}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  {currentUser.name}
                </Link>
              </div>
            </>
          )}
        </div>
        <nav className="humberger__menu__nav mobile-menu">
          <ul>
            {!currentUser.name && (
              <>
                <li>
                  <Link to="/register" className="nav-item nav-link">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="nav-item nav-link">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="humberger__menu__contact">
          <ul>
            <li>
              <i className="fa fa-envelope"></i>
              {currentUser.email}
            </li>
            <li>Free Shipping for all Order of $99</li>
          </ul>
        </div>
      </div>
      {/* <!-- Humberger End --> */}

      {/* <!-- Header Section Begin --> */}
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="header__top__left">
                  <ul>
                    <li>
                      <i className="fa fa-envelope"></i> {currentUser.email}
                    </li>
                    <li>Free Shipping for all Order of $99</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="header__top__right">
                  {!currentUser.name && (
                    <>
                      <div className="header__top__right__auth">
                        <Link to="/login">
                          <i className="fa fa-user"></i> Login
                        </Link>
                      </div>
                    </>
                  )}
                  {currentUser.name && (
                    <>
                      <div className="header__top__right__auth">
                        <Link
                          to="/admin/dashboard"
                          style={{ fontSize: "12sp" }}
                          className="text-center mt-2"
                        >
                          <div
                            style={{
                              borderRadius: "50%",
                              overflow: "hidden",
                              width: "30px",
                              height: "30px",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={currentUser.image}
                              alt={currentUser.name}
                              style={{
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          {currentUser.name}
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link to="/">
                  <img src="img/logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul className="d-flex justify-content-center">
                  {/* <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/product-details">Product</NavLink>
                  </li> */}
                  {!currentUser.name && (
                    <>
                      <li>
                        <Link to="/register" className="nav-item nav-link">
                          Register
                        </Link>
                      </li>
                      <li>
                        <Link to="/login" className="nav-item nav-link">
                          Login
                        </Link>
                      </li>
                    </>
                  )}
                  {/* <li>
                    <NavLink to="/admin">Contact</NavLink>
                  </li> */}
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              {currentUser.name && (
                <>
                  <div className="header__cart">
                    <ul>
                      <li>
                        <Link to="#">
                          <i className="fa fa-heart"></i> <span>1</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/cart">
                          <i className="fa fa-shopping-bag"></i> <span>3</span>
                        </Link>
                      </li>
                    </ul>
                    <div className="header__cart__price">
                      item: <span>$150.00</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="humberger__open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
      {/* <!-- Header Section End --> */}

      {/* <!-- Hero Section Begin --> */}
      <section className="hero hero-normal">
        {currentUser.name && (
          <>
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="hero__categories">
                    <div className="hero__categories__all">
                      <i className="fa fa-bars"></i>
                      <span>All categories</span>
                    </div>
                    <ul>
                      {categories.length > 0 &&
                        categories.map((c, i) => (
                          <li key={i} className="mt-2">
                            {/* <img src={c.image} alt={c.name} height={50} /> */}
                            <Link to="#">{c.name}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Header;
