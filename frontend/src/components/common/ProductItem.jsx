import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import formatPrice from "../../utils/formatPrice";

const LiteratureItemStyles = styled.div`
  padding: 20px 10px;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  &:hover .image {
    transform: scale(1.1);
  }
  .image {
    transition: all 0.2s linear;
  }
  .product-content {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 70px;
  }
  .product-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    color: ${(props) => props.theme.gray80};
  }
  .product-author {
    font-size: 14px;
    flex: 1;
  }
  .product-price {
    color: ${(props) => props.theme.red};
    font-weight: 700;

    flex: 0 1 1;
    margin-top: 5px;
  }
`;

function ProductItem({ item }) {
  return (
    <LiteratureItemStyles key={item._id}>
      <div className="product-image">
        <NavLink to={`/product-detail/${item.slug}`}>
          <img src={item.image} className="image" alt={item.slug} />
        </NavLink>
      </div>
      <div className="product-content">
        <NavLink to={`/product-detail/${item.slug}`}>
          <p className="product-title">{item.title}</p>
        </NavLink>
        <p className="product-price">{formatPrice(item.price)} đ</p>
      </div>
    </LiteratureItemStyles>
  );
}

export default ProductItem;
