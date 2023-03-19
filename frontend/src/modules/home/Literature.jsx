import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import GetData from "../../components/common/GetData";
import formatPrice from "../../utils/formatPrice";

const LiteratureStyles = styled.div`
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  .heading {
    padding: 10px 15px;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: #000;
    width: 350px;
  }
  .product-item {
    padding: 20px 10px;
    transition: all 0.2s linear;
  }
  .product-item:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .product-item:hover .image {
    /* transform: translateY(-10px); */
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

const Literature = ({ data }) => {
  const listBook = data?.data;
  console.log(listBook);
  return (
    <LiteratureStyles>
      <div className="flex items-center justify-between mb-5">
        <h1 className="heading">Sách Văn Học</h1>
        <hr className="w-full" />
        <NavLink
          className="w-[150px] ml-5 block bg-primary text-center
        py-3 px-4 text-xs rounded text-white"
          to={"/product"}
        >
          Xem thêm <i class="fa-solid fa-arrow-right"></i>
        </NavLink>
      </div>
      <div className="celeb-list grid grid-cols-2 lg:grid-cols-5 gap-3">
        {listBook.length > 0 &&
          listBook.map((item) => (
            <div className="product-item" key={item._id}>
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
            </div>
          ))}
      </div>
    </LiteratureStyles>
  );
};
// /product_of_category/:category
export default GetData(Literature, "/product_of_category/sach-van-hoc");
