import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { initialState } from "./categoryValidation";
import { useFormData } from "../../../customHooks/useFormData";
import { updateCategoryStart } from "../../../redux/actions/category.actions";
import { modifyFormData } from "../../../helpers/formHelper";
import InputText from "../../../components/ui/InputText";
import FileInput from "../../../components/ui/FileInput";
import SelectBox from "../../../components/ui/SelectBox";

const EditCategory = () => {
  let categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let [formStatus, setFormStatus] = useState(true);
  let [formData, uploadFileStatus, setFormData, inputChange, uploadFiles] =
    useFormData(initialState, "category");

  const submit = (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);

    if (result.isFormValid) {
      dispatch(updateCategoryStart(result.modifyObject, id));

      setFormStatus(true);

      setTimeout(() => {
        navigate("/admin/category");
      }, 1000);
    } else {
      setFormStatus(false);

      for (const formControl of initialState) {
        formControl.touched = true;
      }

      setFormData((prevValues) => [...prevValues]);
    }
  };
  
  const resetData = () => {
    getCategoryById(id);
    setFormStatus(true);
  };
  
  const getCategoryById = useCallback(
    (id) => {
      let category = categories.find((category) => category.id === id);

      if (category) {
        for (const formControl of initialState) {
          for (const key in category) {
            if (key === formControl.name) {
              formControl.value = category[key];
            }
          }
        }

        setFormData((prevValue) => [...prevValue]);
      } else {
        navigate("/admin/category");
      }
    },
    [categories, setFormData, navigate]
  );

  useEffect(() => {
    getCategoryById(id);
  }, [id, getCategoryById]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Edit Category</h5>
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
              return null;
            })}

          <div className="row">
            <div className="col-sm-6 d-grid">
              <button
                type="submit"
                className="primary-btn"
                style={{ border: "none" }}
                disabled={uploadFileStatus}
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

export default EditCategory;
