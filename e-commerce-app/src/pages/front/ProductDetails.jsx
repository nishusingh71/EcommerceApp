import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrum";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../customHooks/useCart";
import { addCartStart } from "../../redux/actions/cart.actions";

const ProductDetails = () => {
  let products = useSelector((state) => state.product.products);
  let currentCart = useSelector((state) => state.cart.currentCart);
  let currentUser = useSelector((state) => state.user.currentUser);

  let [addItemToCart] = useCart({ ...currentCart }, currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { slug } = useParams();
  let [currentProduct, setCurrentProduct] = useState({});
  let [quantity, setQuantity] = useState(0);

  const getProductBySlug = useCallback(
    (slug) => {
      let product = products.find((product) => product.slug === slug);
      let currentCartProductExists = currentCart.items.find(
        (product) => product.slug === slug
      );

      if (product) {
        setCurrentProduct(product);
        if (currentCartProductExists) {
          setQuantity(+currentCartProductExists.purchaseQuantity);
        }
      } else {
        navigate("/");
      }
    },
    [products, currentCart.items, navigate]
  );

  const addToCart = () => {
    if (!currentUser.id) {
      navigate("/login");
    }
    if (quantity > currentProduct.quantity) {
      alert(`Only ${currentProduct.quantity} units available in stock.`);
      return;
    }
    let cartObject = addItemToCart({ ...currentProduct }, quantity);

    dispatch(addCartStart(cartObject));
  };

  useEffect(() => {
    getProductBySlug(slug);
  }, [slug, getProductBySlug]);
  const handleIncrement = () => {
    if (quantity < currentProduct.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Breadcrumb />
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img
                    className="product__details__pic__item"
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{currentProduct.name}</h3>
                <div className="product__details__price">
                  {currentProduct.price}$
                </div>
                <p>{currentProduct.shortDescription}</p>
                <div
                  className="input-group quantity mb-5"
                  style={{ width: "100px" }}
                >
                  <div className="input-group-btn">
                    <button
                      className="btn btn-sm btn-minus rounded-circle bg-light border"
                      onClick={handleDecrement}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-sm text-center border-0"
                    value={quantity}
                    onChange={() => {}}
                  />
                  <div className="input-group-btn">
                    <button
                      className="btn btn-sm btn-plus rounded-circle bg-light border"
                      onClick={handleIncrement}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <Link to="#" className="primary-btn" onClick={addToCart}>
                  ADD TO CART
                </Link>

                <ul>
                  <li>
                    <b>Color</b> <span>{currentProduct.color}</span>
                  </li>
                  <li>
                    <b>Category</b> <span>{currentProduct.category}</span>
                  </li>
                  <li>
                    <b>Weight</b> <span>{currentProduct.weight}</span>
                  </li>
                  <li>
                    <b>Quantity</b>
                    <span>{currentProduct.quantity}</span>
                  </li>
                  <li>
                    <b>Status</b>
                    <span>{currentProduct.status}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>{currentProduct.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
