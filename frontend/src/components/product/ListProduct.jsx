import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import axiosClient from "../../axios/configAxios";
import ProductItem from "../common/ProductItem";

const ListProductStyles = styled.div`
  width: 75%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .product-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
`;
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
const ProductContentStyles = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 50px;
`;
const ListProduct = () => {
  const [listCategory, setListCategory] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  // const [nextPage, setNextPage] = useState(1);
  const [title, setTitle] = useState("Tất cả sản phẩm");
  const [pageCount, setPageCount] = useState(0);
  const [url, setUrl] = useState(`/getProductAll`);
  const handleGetCategory = async () => {
    const response = await axiosClient({
      method: "get",
      url: "/get_category_all",
    });
    setListCategory(response.data);
  };
  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setUrl(`/getProductAll?page=${page}`);
  };
  const handleGetProductByCategory = (slug, categoryName) => {
    setUrl(`/getProductAll?category=${slug}`);
    setTitle(categoryName);
  };
  useEffect(() => {
    const handleGetProductAll = async () => {
      const response = await axiosClient.request({
        method: "get",
        url: url,
      });
      setListProduct(response.data);
      setPageCount(Math.ceil(response.totalPage));
    };
    handleGetProductAll();
    handleGetCategory();
  }, [url]);
  return (
    <ProductContentStyles>
      <CategoryStyles>
        <h3 className="category-title">Danh mục sản phẩm</h3>
        <div className="category-list">
          {listCategory.length > 0 &&
            listCategory.map((category) => (
              <div key={category._id}>
                <p
                  onClick={() =>
                    handleGetProductByCategory(
                      category.slug,
                      category.categoryName
                    )
                  }
                >
                  {category.categoryName}
                </p>
              </div>
            ))}
        </div>
      </CategoryStyles>
      <ListProductStyles>
        <h3 className="product-title">{title}</h3>
        <div className="product-list">
          {listProduct.length > 0 &&
            listProduct.map((item, index) => (
              <ProductItem key={index} item={item}></ProductItem>
            ))}
        </div>
        <div className="pb-10">
          <ReactPaginate
            hrefBuilder={() => {
              return "#";
            }}
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            disableInitialCallback={true}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="mb-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-[6px] text-[15px] text-[#ececec] lg:gap-x-3 lg:text-base lg:mb-0 "
            pageLinkClassName="bg-[#33292E] bg-opacity-80 page-link transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            previousClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            nextClassName="bg-[#33292E] nextPage bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
            activeClassName="page-active text-primary"
            disabledClassName="opacity-40"
            disabledLinkClassName="hover:cursor-default"
          />
        </div>
      </ListProductStyles>
    </ProductContentStyles>
  );
};

export default ListProduct;
