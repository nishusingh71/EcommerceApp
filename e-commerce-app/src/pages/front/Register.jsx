import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrum";
import { initialState } from "./registerValidation";
import Styles from "./LoginForm.module.css";
import InputEmail from "../../components/ui/InputEmail";
import InputPassword from "../../components/ui/InputPassword";
import { Link, useNavigate } from "react-router-dom";
import { useFormData } from "../../customHooks/useFormData";
import { useDispatch } from "react-redux";
import { modifyFormData } from "../../helpers/formHelper";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseconfig";
import {
  addUserStart,
} from "../../redux/actions/user.actions";
import InputText from "../../components/ui/InputText";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [formStatus, setFormStatus] = useState(true);
  let [formData, , setFormData, inputChange] = useFormData(initialState, "");
  let [errorMessage, setErrorMessage] = useState(
    "Please Enter all required Field"
  );

  const submit = async (event) => {
    event.preventDefault();

    let result = modifyFormData(formData);

    if (result.isFormValid) {
      try {
        let userCredential = await createUserWithEmailAndPassword(
          auth,
          result.modifyObject.email,
          result.modifyObject.password
        );

        dispatch(
          addUserStart({ ...result.modifyObject, uid: userCredential.user.uid })
        );

        setFormStatus(true);

        setFormData([...initialState]);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        setFormStatus(false);
        setErrorMessage("Email id already exists");
      }
    } else {
      setFormStatus(true);

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

      <div className="container mt-4">
        <div className={`row ${Styles.mainContent} bg-success`}>
          <div className={`col-md-12 col-xs-12 col-sm-12 ${Styles.loginForm}`}>
            <div className="container-fluid">
              <div className="row mt-4 text-center">
                <h2>Register</h2>
              </div>
              <div className="row">
                <form className="form-group" onSubmit={submit}>
                  {!formStatus && (
                    <h5 className="text-danger text-center">{errorMessage}</h5>
                  )}
                  {initialState.length > 0 &&
                    initialState.map((state, index) => {
                      if (state.name === "name") {
                        return (
                          <InputText
                            formControl={state}
                            inputChange={inputChange}
                            key={index}
                          />
                        );
                      }

                      if (state.name === "email") {
                        return (
                          <InputEmail
                            formControl={state}
                            inputChange={inputChange}
                            key={index}
                          />
                        );
                      }

                      if (state.name === "password") {
                        return (
                          <InputPassword
                            formControl={state}
                            inputChange={inputChange}
                            key={index}
                          />
                        );
                      }

                      return null;
                    })}
                  <div className="d-grid">
                    <button className="btn btn-primary py-2 text-white">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="row text-center mt-4">
                <p>
                  Allready have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
