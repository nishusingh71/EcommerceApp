import React, { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrum";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/cart/CartItem";
import { getCartSuccess } from "../../redux/actions/cart.actions";
import { fetchCartFromLocalStorage } from "../../redux/services/cart.services";

const Cart = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  let currentCart = useSelector((state) => state.cart.currentCart);
  useEffect(() => {
    if (currentUser && currentUser.id) {
      const userCart = fetchCartFromLocalStorage(currentUser.id);

      dispatch(getCartSuccess(userCart));
    }
  }, [currentUser, dispatch]);
  return (
    <>
      <Breadcrumb />
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__product">Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCart.items && currentCart.items.length > 0 ? (
                      currentCart.items.map((item, index) => (
                        <CartItem key={index} item={item} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No items in your cart.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <Link to="/" className="primary-btn cart-btn">
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <div className="shoping__checkout">
                <h5>Cart Total</h5>
                <ul>
                  <li>
                    Subtotal <span>${currentCart.subTotal.toFixed(2)}</span>
                  </li>
                  <li>
                    Tax <span>${currentCart.tax.toFixed(2)}</span>
                  </li>
                  <li>
                    Total <span>${currentCart.grandTotal.toFixed(2)}</span>
                  </li>
                </ul>
                <Link to="/checkout" className="primary-btn">
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
