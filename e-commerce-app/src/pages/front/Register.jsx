import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormData } from "../../customHooks/useFormData";
import { modifyFormData } from "../../helpers/formHelper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { addUserStart } from "../../redux/actions/user.actions";
import Styles from "./LoginForm.module.css";
import InputText from "../../components/ui/InputText";
import InputEmail from "../../components/ui/InputEmail";
import InputPassword from "../../components/ui/InputPassword";
import FileInput from "../../components/ui/FileInput";
import SelectBox from "../../components/ui/SelectBox";
import { initialState } from "./registerValidation";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [formStatus, setFormStatus] = useState(true);
  let [formData, , setFormData, inputChange, uploadFiles] = useFormData(
    initialState,
    "user"
  );
  let [errorMessage, setErrorMessage] = useState(
    "please Enter all required Field"
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
      for (const formControl of initialState) {
        formControl.touched = true;
      }
      setFormData((prevValue) => [...prevValue]);
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
                      if (state.type === "password") {
                        return (
                          <InputPassword
                            formControl={state}
                            inputChange={inputChange}
                            key={index}
                          />
                        );
                      }
                      if (state.type === "file") {
                        return (
                          <FileInput
                            formControl={state}
                            uploadFiles={uploadFiles}
                            key={index}
                          />
                        );
                      }
                      if (state.type === "select") {
                        if (state.name === "status") {
                          return (
                            <SelectBox
                              formControl={state}
                              inputChange={inputChange}
                              values={[
                                { name: "active" },
                                { name: "inactive" },
                              ]}
                              key={index}
                            />
                          );
                        }
                        if (state.name === "role") {
                          return (
                            <SelectBox
                              formControl={state}
                              inputChange={inputChange}
                              values={[{ name: "admin" }, { name: "customer" }]}
                              key={index}
                            />
                          );
                        }
                      }
                      return null;
                    })}
                  <div className="d-grid">
                    <button
                      className="primary-btn py-2 text-white"
                      style={{ border: "none" }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="row text-center mt-4">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className={Styles.link}>
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
