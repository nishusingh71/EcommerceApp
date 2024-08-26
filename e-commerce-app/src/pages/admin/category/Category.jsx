import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCategoryStart,
  getCategoryStart,
} from "../../../redux/actions/category.actions";

const Category = () => {
  let categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  const deleteCategory = (id) => {
    dispatch(deleteCategoryStart(id));
  };
  const getCategory = useCallback(() => {
    dispatch(getCategoryStart());
  }, [dispatch]);
  useEffect(() => {
    getCategory();
  }, [categories.length, getCategory]);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between ">
        <h5>Category</h5>
        <Link to="/admin/category/add" className="primary-btn">
          Add Category
        </Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <img
                        height={"50px"}
                        src={category.image}
                        alt={category.name}
                      />
                    </td>
                    <td>{category.name}</td>
                    <td>
                      {category.status === "active" ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <Link
                        to={`/admin/category/edit/${category.id}`}
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCategory(category.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;
