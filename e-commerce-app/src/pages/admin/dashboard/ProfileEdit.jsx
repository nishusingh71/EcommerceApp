import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormData } from "../../../customHooks/useFormData";
import { initialState } from "./profileEditValidation";
import { modifyFormData } from "../../../helpers/formHelper";
import { editProfileStart } from "../../../redux/actions/user.actions";
import InputText from "../../../components/ui/InputText";
import FileInput from "../../../components/ui/FileInput";
import InputEmail from "../../../components/ui/InputEmail";

const ProfileEdit = () => {
  let currentUser = useSelector((state) => state.user.currentUser);
  let users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [formStatus, setFormStatus] = useState(true);
  let [formData, uploadFileStatus, setFormData, inputChange, uploadFiles] =
    useFormData([...initialState], "user");

  const submit = (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);

    if (result.isFormValid) {
      dispatch(
        editProfileStart(
          { ...result.modifyObject, id: currentUser.id },
          currentUser.id
        )
      );

      setFormStatus(true);

      setFormData(initialState);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } else {
      setFormStatus(false);

      for (const formControl of formData) {
        formControl.touched = true;
      }

      setFormData((prevValues) => [...prevValues]);
    }
  };
  const resetData = () => {
    getUserById();
    setFormStatus(true);
  };
  const getUserById = useCallback(() => {
    let user = users.find((user) => user.id === currentUser.id);

    if (user) {
      for (const formControl of initialState) {
        for (const key in user) {
          if (key === formControl.name) {
            formControl.value = user[key];
          }
        }
      }

      setFormData((prevValue) => [...prevValue]);
    } else {
      navigate("/admin/dashboard");
    }
  }, [users, currentUser.id, setFormData, navigate]);

  useEffect(() => {
    getUserById(currentUser.id);
  }, [currentUser.id, getUserById]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Profile Edit</h5>
        <Link to="/admin/dashboard" className="primary-btn  text-white">
          Back
        </Link>
      </div>
      <div className="card-body">
        {!formStatus && (
          <h5 className="text-danger text-center">
            Please Enter all required Field
          </h5>
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

              if (state.type === "file") {
                return (
                  <FileInput
                    formControl={state}
                    uploadFiles={uploadFiles}
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
                    disabled={true}
                  />
                );
              }

              return null;
            })}

          <div className="row">
            <div className="col-sm-6 d-grid">
              <button
                type="submit"
                className="primary-btn  text-white"
                disabled={uploadFileStatus}
                style={{ border: "none" }}
              >
                Submit
              </button>
            </div>
            <div className="col-sm-6 d-grid">
              <button
                type="reset"
                className="btn btn-warning text-white"
                disabled={uploadFileStatus}
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

export default ProfileEdit;
