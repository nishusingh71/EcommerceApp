import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { initialState } from "./profileEditValidation";
import { useFormData } from "../../../customHooks/useFormData";
import { modifyFormData } from "../../../helpers/formHelper";
import InputText from "../../../components/ui/InputText";
import InputEmail from "../../../components/ui/InputEmail";
import FileInput from "../../../components/ui/FileInput";
import { profileEditStart } from "../../../redux/actions/user.actions";

const ProfileEdit = () => {
  let currentUser = useSelector((state) => state.user.users);
  let users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [formStatus, setFormStatus] = useState(true);
  let [formData, uploadFilesStatus, setFormData, inputChange, uploadFiles] =
    useFormData(initialState, "user");

  const submit = (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);

    if (result.isFormValid) {
      dispatch(
        profileEditStart(
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

      for (const formControl of initialState) {
        formControl.touched = true;
      }

      setFormData((prevValues) => [...prevValues]);
    }
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
        <h5>Edit User</h5>
        <Link to="/admin/dashboard" className="primary-btn">
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
              if (state.type === "file") {
                return (
                  <FileInput
                    formControl={state}
                    uploadFiles={uploadFiles}
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
