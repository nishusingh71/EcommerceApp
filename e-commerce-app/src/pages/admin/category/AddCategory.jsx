import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCategoryStart } from "../../../redux/actions/category.actions";
import { useFormData } from "../../../customHooks/useFormData";
import { initialState } from "./categoryValidation";
import { modifyFormData } from "../../../helpers/formHelper";
import InputText from "../../../components/ui/InputText";
import FileInput from "../../../components/ui/FileInput";
import SelectBox from "../../../components/ui/SelectBox";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [formStatus, setFormStatus] = useState(true);
  let [formData, uploadFilesStatus, setFormData, inputChange, uploadFiles] =
    useFormData(initialState, "category");
  const submit = (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);
    if (result.isFormValid) {
      dispatch(addCategoryStart(result.modifyObject));
      setFormStatus(true);
      setTimeout(() => {
        navigate("/admin/category");
      }, 1000);
    } else {
      setFormStatus(false);
      for (const formControl of formData) {
        formControl.touched = true;
      }
      setFormData((prevValue) => [...prevValue]);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Add Category</h5>
        <Link to="/admin/category" className="primary-btn">
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
            // eslint-disable-next-line array-callback-return
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
              }
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

export default AddCategory;
