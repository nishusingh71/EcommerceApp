import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormData } from "../../../customHooks/useFormData";
import { initialState } from "../product/productValidation";
import InputText from "../../../components/ui/InputText";
import FileInput from "../../../components/ui/FileInput";
import Number from "../../../components/ui/Number";
import Textarea from "../../../components/ui/Textarea";
import SelectBox from "../../../components/ui/SelectBox";
import { addProductStart } from "../../../redux/actions/product.actions";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [formData, uploadFilesStatus, , inputChange, uploadFiles] = useFormData(
    initialState,
    "product"
  );
  const categories = useSelector((state) => state.category.categories);
  const submit = (event) => {
    event.preventDefault();
    if (formData.formStatus === "valid") {
      let transferObject = {};
      for (const key in formData) {
        if (key !== "formStatus") {
          transferObject[key] = formData[key].value;
        }
      }
      dispatch(addProductStart(transferObject));
      setTimeout(() => {
        navigate("/admin/product");
      }, 1000);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Add Product</h5>
        <Link to="/admin/product" className="primary-btn">
          Back
        </Link>
      </div>
      <div className="card-body">
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
              if (state.type === "textarea") {
                return (
                  <Textarea
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
                if (state.name === "type") {
                  return (
                    <SelectBox
                      formControl={state}
                      inputChange={inputChange}
                      values={[{ name: "simple" }, { name: "virtual" }]}
                      key={index}
                    />
                  );
                }
                if (state.name === "category") {
                  return (
                    <SelectBox
                      formControl={state}
                      inputChange={inputChange}
                      values={categories}
                      key={index}
                    />
                  );
                }
              }
              if (state.type === "number") {
                return (
                  <Number
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

export default AddProduct;
