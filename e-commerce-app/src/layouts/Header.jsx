import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategoryStart } from "../redux/actions/category.actions";
import { fetchCartFromLocalStorage } from "../redux/services/cart.services";
import { getCartSuccess } from "../redux/actions/cart.actions";
import logo from "../logo.png";
const Header = () => {
  const categories = useSelector((state) => state.category.categories);
  const currentUser = useSelector((state) => state.user.currentUser);
  let currentCart = useSelector((state) => state.cart.currentCart);
  const dispatch = useDispatch();
  const getCategory = useCallback(() => {
    dispatch(getCategoryStart());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length !== 0) {
      getCategory();
    }
    if (currentUser && currentUser.id) {
      const userCart = fetchCartFromLocalStorage(currentUser.id);

      dispatch(getCartSuccess(userCart));
    }
  }, [categories.length, currentUser, dispatch, getCategory]);
  // const isCartEmpty = !currentCart.items || currentCart.items.length === 0;

  return (
    <>
      {/* <!-- Humberger Begin --> */}
      <div className="humberger__menu__overlay"></div>
      <div className="humberger__menu__wrapper">
        <>
          <div className="humberger__menu__logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
        </>

        {currentUser.name && (
          <>
            {currentCart.items && currentCart.items.length > 0 && (
              <div className="humberger__menu__cart">
                <ul>
                  <li>
                    <Link to="/cart">
                      <i className="fa fa-shopping-bag"></i>{" "}
                      <span>{currentCart.items.length}</span>
                    </Link>
                  </li>
                </ul>
                <div className="header__cart__price">
                  item: <span>${currentCart.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            )}
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
                    className="ms-3"
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
                      <div className="header__top__right__auth d-flex justify-content-end m-auto">
                        <Link
                          to="/admin/dashboard"
                          style={{ fontSize: "12sp" }}
                          className="text-center mt-2"
                        >
                          <div
                            className="ms-3"
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
                {currentUser.name ? (
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                ) : (
                  <Link style={{ cursor: "default" }}>
                    <img src={logo} alt="" />
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul className="d-flex justify-content-center">
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
            </div>
            <div className="col-lg-3">
              {currentUser.name && (
                <>
                  {currentCart.items && currentCart.items.length > 0 && (
                    <div className="header__cart">
                      <ul>
                        <li>
                          <Link to="/cart">
                            <i className="fa fa-shopping-bag"></i>{" "}
                            <span>{currentCart.items.length}</span>
                          </Link>
                        </li>
                      </ul>
                      <div className="header__cart__price">
                        item: <span>${currentCart.grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="humberger__open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
