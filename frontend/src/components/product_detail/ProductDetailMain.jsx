import React from "react";
import styled from "styled-components";
import formatPrice from "../../utils/formatPrice";
import { Button } from "../button";
import Quantity from "../quantity/Quantity";
import StarRating from "../rating/StarRating";

const ProductDetailMainStyles = styled.div`
  margin-top: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 12px;
  .product-wrapper {
    padding: 30px;
    display: flex;
  }
  .product-image {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product-image img {
    display: block;
    max-width: 400px;
  }
  .product-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .product-info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .product-year,
  .product-author {
    font-weight: 500;
  }
  .product-price {
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.red};
  }
  .addToCart {
    margin-top: 60px;
    display: flex;
    gap: 50px;
  }
`;
function ProductDetailMain({
  reviewCount,
  averageScore,
  id,
  title,
  image,
  author,
  year,
  price,
}) {
  return (
    <ProductDetailMainStyles>
      <div className="product-wrapper">
        <div className="product-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-content">
          <h2 className="product-title">{title}</h2>
          <h4 className="product-info">
            <span>Tác giả:</span>
            <span className="product-author">{author}</span>
          </h4>
          <h4 className="product-info">
            <span>Năm xuất bản: </span>
            <span className="product-year">{year}</span>
          </h4>
          <div className="flex items-center mt-3">
            {<StarRating rating={averageScore} textSm={true}></StarRating>}
            <span>({reviewCount} đánh giá)</span>
          </div>
          <p className="product-info">
            <span>Giá: </span>
            <span className="product-price">
              {price && formatPrice(price)} đ
            </span>
          </p>
          <Quantity></Quantity>
          <div className="addToCart">
            <Button height={"50px"}>Thêm vào giỏ hàng</Button>
          </div>
        </div>
      </div>
    </ProductDetailMainStyles>
  );
}

export default ProductDetailMain;
