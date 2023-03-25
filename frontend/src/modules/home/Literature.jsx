import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import GetData from "../../components/common/GetData";

import LiteratureItem from "./LiteratureItem";

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
`;

const Literature = ({ data }) => {
  const listBook = data?.data;
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
          Xem thêm <i className="fa-solid fa-arrow-right"></i>
        </NavLink>
      </div>
      <div className="celeb-list grid grid-cols-2 lg:grid-cols-5 gap-3">
        {listBook.length > 0 &&
          listBook.map((item) => (
            <LiteratureItem item={item} key={item._id}></LiteratureItem>
          ))}
      </div>
    </LiteratureStyles>
  );
};
export default GetData(Literature, "/product_of_category/sach-van-hoc");
