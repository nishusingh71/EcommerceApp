import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { initialState } from "./userValidation";
import { useFormData } from "../../../customHooks/useFormData";
import { modifyFormData } from "../../../helpers/formHelper";
import { addUserStart } from "../../../redux/actions/user.actions";
import InputText from "../../../components/ui/InputText";
import InputEmail from "../../../components/ui/InputEmail";
import FileInput from "../../../components/ui/FileInput";
import SelectBox from "../../../components/ui/SelectBox";
import InputPassword from "../../../components/ui/InputPassword";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseconfig";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [formStatus, setFormStatus] = useState(false);
  let [errorMessage, setErrorMessage] = useState(
    "Please Enter all required Field"
  );
  let [formData, uploadFilesStatus, setFormData, inputChange, uploadFiles] =
    useFormData(initialState, "user");
  const submit = async (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);
    console.log(result);
    if (result.isFormValid) {
      console.log(result);
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
        setTimeout(() => {
          navigate("/admin/user");
        }, 1000);
      } catch (error) {
        setFormStatus(true);
        setErrorMessage("Email id already exists");
      }
    } else {
      setFormStatus(false);
      for (const formControl of initialState) {
        formControl.touched = true;
      }
      setFormData((prevValue) => [...prevValue]);
    }
  };
  const resetData=()=>{
    setDefaultValue();
    setFormStatus(true);
  }
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
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Add User</h5>
        <Link to="/admin/user" className="primary-btn">
          Back
        </Link>
      </div>
      <div className="card-body">
        {formStatus && (
          <h5 className="text-danger text-center">{errorMessage}</h5>
        )}
        <form onSubmit={submit}>
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
                      values={[{ name: "active" }, { name: "inactive" }]}
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
              if (state.type === "password") {
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

          <div className="row">
            <div className="col-sm-6 d-grid">
              <button
                type="submit"
                className="primary-btn"
                style={{ border: "none" }}
                disabled={uploadFilesStatus}
              >
                Submit
              </button>
            </div>
            <div className="col-sm-6 d-grid">
              <button
                type="reset"
                className="btn btn-warning text-white"
                disabled={uploadFilesStatus}
                onClick={resetData}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
