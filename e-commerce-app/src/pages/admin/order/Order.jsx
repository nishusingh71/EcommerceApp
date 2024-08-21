import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderStart } from "../../../redux/actions/order.actions";
import { Link } from "react-router-dom";

const Order = () => {
  let orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const getOrder = useCallback(() => {
    dispatch(getOrderStart());
  }, [dispatch]);

  useEffect(() => {
    getOrder();
  }, [orders.length, getOrder]);
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Orders</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Sub Total</th>
                <th>Tax</th>
                <th>Grand Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders.map((order, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{order.billingAddress.name}</th>
                    <th>$ {order.subTotal}</th>
                    <th>$ {order.tax}</th>
                    <th>$ {order.grandTotal}</th>
                    <td>
                      <Link
                        to={`/admin/order/view/${order.id}`}
                        className="btn btn-info me-2"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
