import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductItem from "../../components/product/ProductItem";

const Home = () => {
  const navigate = useNavigate();
  let product = useSelector((state) => state.product.products);
  let categories = useSelector((state) => state.category.categories);
  let currentUser = useSelector((state) => state.user.currentUser);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? product
      : product.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    if (!currentUser.name) {
      navigate("/login");
    }
  });
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Products</h2>
              </div>
              <div className="featured__controls">
                <ul>
                  <li
                    key={1}
                    className={`category-item ${
                      selectedCategory === "All" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick("All")}
                  >
                    All
                  </li>

                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className={`category-item ${
                        selectedCategory === category.name ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {filteredProducts.length > 0 &&
              filteredProducts.map((product, index) => (
                <ProductItem product={product} index={index} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
