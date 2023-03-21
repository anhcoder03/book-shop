import React from "react";
import styled from "styled-components";
import GetData from "../common/GetData";
import { NavLink } from "react-router-dom";

const CategoryStyles = styled.div`
  width: 25%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .category-list {
    display: flex;
    flex-direction: column;
  }
  .category-title {
    font-size: 20px;
    font-weight: 700;
  }
`;
function Category({ data }) {
  let listCategory = [];
  if (data?.data) listCategory = data.data;
  return (
    <CategoryStyles>
      <h3 className="category-title">Danh mục sản phẩm</h3>
      <div className="category-list">
        {listCategory.length > 0 &&
          listCategory.map((category) => (
            <div key={category._id}>
              <p onClick={() => handleGetProductByCateogy(category.slug)}>
                {category.categoryName}
              </p>
            </div>
          ))}
      </div>
    </CategoryStyles>
  );
}

export default GetData(Category, "/get_category_all");
