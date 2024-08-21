import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../customHooks/useCart";
import { addCartStart } from "../../redux/actions/cart.actions";

const CartItem = ({ item, index }) => {
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => state.user.currentUser);
  let currentCart = useSelector((state) => state.cart.currentCart);
  let [quantity, setQuantity] = useState(item.purchaseQuantity);
  let [, updateItemToCart, removeItemFromCart] = useCart(
    { ...currentCart },
    currentUser
  );
  
  const removeItem = () => {
    let cartObject = removeItemFromCart({ ...item });
    dispatch(addCartStart(cartObject));
  };
  
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      let cartObject = updateItemToCart({ ...item }, quantity + 1);
      dispatch(addCartStart(cartObject));
    } else {
      toast.error("Reached Your Limit");
    }
  };
  
  const decrementQuantity = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
      let cartObject = updateItemToCart({ ...item }, quantity - 1);
      dispatch(addCartStart(cartObject));
    } else {
      removeItem();
    }
  };
  
  return (
    <>
      <tr>
        <td className="shoping__cart__item" key={index}>
          <img src={item.image} alt={item.name} height={80} />
          <h5 className="m-auto">{item.name}</h5>
        </td>
        <td className="shoping__cart__price">${item.price}</td>
        <td className="shoping__cart__quantity">
          <span
            className="input-group quantity justify-content-center m-auto"
            style={{ width: "100px", display: "flex" }}
          >
            <button
              className="btn btn-sm btn-minus rounded-circle bg-light border"
              onClick={decrementQuantity}
            >
              <i className="fa fa-minus"></i>
            </button>
            <input
              type="text"
              className="form-control form-control-sm text-center border-0"
              value={quantity}
              onChange={() => {}}
              style={{ width: "40px" }}
            />
            <button
              className="btn btn-sm btn-plus rounded-circle bg-light border"
              onClick={incrementQuantity}
            >
              <i className="fa fa-plus"></i>
            </button>
          </span>
        </td>
        <td className="shoping__cart__total">
          ${item.price * item.purchaseQuantity}
        </td>
        <td className="shoping__cart__item__close">
          <span className="icon_close" onClick={removeItem}></span>
        </td>
      </tr>
      <Toaster />
    </>
  );
};

export default CartItem;
