import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderView = () => {
  let [orderObject, setOrderObject] = useState({});

  let { id } = useParams();

  let orders = useSelector((state) => state.order.orders);
  const navigate = useNavigate();

  const getOrderById = useCallback(
    (id) => {
      let order = orders.find((order) => order.id === id);

      if (order) {
        setOrderObject(order);
      } else {
        navigate("/admin/order");
      }
    },
    [orders, setOrderObject, navigate]
  );

  useEffect(() => {
    getOrderById(id);
  }, [id, getOrderById]);
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>View Order</h5>
        <Link to="/admin/order" className=" primary-btn btn-sm text-white">
          Back
        </Link>
      </div>
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group-item primary-btn" aria-current="true">
            Billing Address
          </li>
          <li className="list-group-item">
            Name: {orderObject.billingAddress?.name}
          </li>
          <li className="list-group-item">
            Email: {orderObject.billingAddress?.email}
          </li>
          <li className="list-group-item">
            Contact Number: {orderObject.billingAddress?.phone}
          </li>
          <li className="list-group-item">
            Address: {orderObject.billingAddress?.address}
          </li>
          <li className="list-group-item">
            City: {orderObject.billingAddress?.city}
          </li>
          <li className="list-group-item">
            State: {orderObject.billingAddress?.state}
          </li>
          <li className="list-group-item">
            Country: {orderObject.billingAddress?.country}
          </li>
          <li className="list-group-item">
            ZipCode: {orderObject.billingAddress?.zipcode}
          </li>
        </ul>

        <ul className="list-group mt-5">
          <li className="list-group-item primary-btn" aria-current="true">
            Products
          </li>
          <li className="list-group-item">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Puchased Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orderObject.items?.length > 0 &&
                    orderObject.items.map((product, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <th>
                          <img src={product.image} alt="" height={50} />
                        </th>
                        <th>{product.name}</th>
                        <th>{product.type}</th>
                        <th>{product.category}</th>
                        <th>$ {product.price}</th>
                        <th>{product.purchaseQuantity}</th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderView;
