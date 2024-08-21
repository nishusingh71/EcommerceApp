import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrum";
import { useDispatch, useSelector } from "react-redux";
import CheckItem from "../../components/checkout/CheckItem";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../customHooks/useFormData";
import { initialState } from "./checkoutValidation";
import { modifyFormData } from "../../helpers/formHelper";
import { placeOrderStart } from "../../redux/actions/order.actions";
import InputText from "../../components/ui/InputText";
import InputEmail from "../../components/ui/InputEmail";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentCart = useSelector((state) => state.cart.currentCart);
  let [formStatus, setFormStatus] = useState(true);
  let [errorMessage] = useState("Please Enter all required Field");
  let [formData, , setFormData, inputChange] = useFormData(initialState, "");
  const submit = async (event) => {
    event.preventDefault();

    let result = modifyFormData(formData);

    if (result.isFormValid) {
      let orderObject = { ...currentCart, billingAddress: result.modifyObject };

      dispatch(placeOrderStart(orderObject));

      setTimeout(() => {
        navigate("/thank-you");
      }, 1000);
    } else {
      setFormStatus(false);

      for (const formControl of formData) {
        formControl.touched = true;
      }

      setFormData((prevValues) => [...prevValues]);
    }
  };
  const setDefaultValue = useCallback(() => {
    for (const formControl of initialState) {
      formControl.value = "";
      formControl.touched = false;
    }

    setFormData((prevValue) => [...prevValue]);
  }, [setFormData]);

  useEffect(() => {
    setDefaultValue();
  }, [setDefaultValue]);
  return (
    <>
      <Breadcrumb />
      <section className="checkout spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <h6>
                <span className="icon_tag_alt"></span> Have a coupon?{" "}
                <Link to="#">Click here</Link> to enter your code
              </h6> */}
            </div>
          </div>
          <div className="checkout__form">
            <h4>Billing Details</h4>
            <form onSubmit={submit}>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  {!formStatus && (
                    <h5 className="text-danger text-center">{errorMessage}</h5>
                  )}

                  {initialState.length > 0 &&
                    initialState.map((state, index) => {
                      if (state.type === "text") {
                        return (
                          <InputText
                            formControl={state}
                            inputChange={inputChange}
                            key={index}
                          />
                        );
                      }

                      if (state.type === "email") {
                        return (
                          <InputEmail
                            formControl={state}
                            inputChange={inputChange}
                            key={index}
                          />
                        );
                      }

                      return null;
                    })}
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4>Your Order</h4>
                    <div className="checkout__order__products">
                      Products <span>Total</span>
                    </div>
                    <ul>
                      {currentCart.items.length > 0 &&
                        currentCart.items.map((item, index) => (
                          <CheckItem item={item} key={index} />
                        ))}
                    </ul>
                    <div className="checkout__order__subtotal">
                      Subtotal <span>${currentCart.subTotal.toFixed(2)}</span>
                      <br />
                      <br />
                      Tax <span>${currentCart.tax.toFixed(2)}</span>
                    </div>
                    <div className="checkout__order__total">
                      Total <span>${currentCart.grandTotal}</span>
                    </div>
                    <button className="site-btn">PLACE ORDER</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
