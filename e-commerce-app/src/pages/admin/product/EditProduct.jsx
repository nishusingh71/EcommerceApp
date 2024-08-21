import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormData } from "../../../customHooks/useFormData";
import { initialState } from "../product/productValidation";
import InputText from "../../../components/ui/InputText";
import FileInput from "../../../components/ui/FileInput";
import Number from "../../../components/ui/Number";
import Textarea from "../../../components/ui/Textarea";
import SelectBox from "../../../components/ui/SelectBox";
import { updateProductStart } from "../../../redux/actions/product.actions";
import { modifyFormData } from "../../../helpers/formHelper";

const EditProduct = () => {
  let categories = useSelector((state) => state.category.categories);
  let products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let [formStatus, setFormStatus] = useState(true);
  let [formData, uploadFileStatus, setFormData, inputChange, uploadFiles] =
    useFormData(initialState, "product");

  const submit = (event) => {
    event.preventDefault();
    let result = modifyFormData(formData);

    if (result.isFormValid) {
      dispatch(updateProductStart(result.modifyObject, id));

      setFormStatus(true);

      setTimeout(() => {
        navigate("/admin/product");
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
    getProductById(id);
    setFormStatus(true);
  };

  const getProductById = useCallback(
    (id) => {
      let product = products.find((product) => product.id === id);

      if (product) {
        for (const formControl of initialState) {
          for (const key in product) {
            if (key === formControl.name) {
              formControl.value = product[key];
            }
          }
        }

        setFormData((prevValue) => [...prevValue]);
      } else {
        navigate("/admin/product");
      }
    },
    [products, setFormData, navigate]
  );

  useEffect(() => {
    getProductById(id);
  }, [getProductById, id]);
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Edit Product</h5>
        <Link to="/admin/product" className="primary-btn">
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

export default EditProduct;
