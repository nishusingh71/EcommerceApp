import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../customHooks/useCart";
import { addCartStart } from "../../redux/actions/cart.actions";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => state.user.currentUser);
  let currentCart = useSelector((state) => state.cart.currentCart);

  let [addItemToCart] = useCart({ ...currentCart }, currentUser);

  const addToCart = () => {
    if (!currentUser.id) {
      navigate("/login");
    }

    let cartObject = addItemToCart({ ...product });

    dispatch(addCartStart(cartObject));
  };
  return (
    <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
  <div className="featured__item">
    {/* Image section with conditional redirection */}
    <div
      className="featured__item__pic set-bg"
      style={{ backgroundImage: `url(${product.image})` }}
      onClick={(e) => {
        e.target.closest('.fa-shopping-cart')
          ? addToCart(e)
          : (window.location.href = `/product-details/${product.slug}`);
      }}
    >
      {/* Cart icon click handler separate from redirection */}
      <ul className="featured__item__pic__hover">
        <li>
          <p style={{ cursor: "pointer" }}>
            <i className="fa fa-shopping-cart"></i>
          </p>
        </li>
      </ul>
    </div>

    {/* Text section with direct link to product details */}
    <div className="featured__item__text">
      <h6>
        <Link to={`/product-details/${product.slug}`}>{product.name}</Link>
      </h6>
      <h5>${product.price}</h5>
    </div>
  </div>
</div>

  );
};

export default ProductItem;
