import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ResultSearchStyle = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  z-index: 9;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  .product-item {
    display: flex;
    width: 100%;
    max-height: 120px;
    align-items: center;
  }
  .product-image {
    width: 100px;
    height: 100%;
  }
  .product-image img {
    width: 100%;
    height: 100%;
  }
`;
function ResultSearch({ data, show = true, nodeRef }) {
  return (
    <>
      {show && (
        <ResultSearchStyle>
          {data.length > 0 ? (
            data.map((item) => (
              <div className="product-item" key={item._id}>
                <div className="product-image">
                  <img src={item.image} alt="" />
                </div>
                <div className="product-name">
                  <NavLink to={`/product-detail/${item.slug}`}>
                    <p className="product-title">{item.title}</p>
                  </NavLink>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full text-xs italic font-thin leading-9 text-center transition-all">
              No products
            </div>
          )}
        </ResultSearchStyle>
      )}
    </>
  );
}

export default ResultSearch;
