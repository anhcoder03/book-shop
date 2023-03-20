import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axiosClient from "../../axios/configAxios";
import { useDebounce } from "../../hooks/useDebounce";
import useClickOutSide from "../../hooks/useClickOutSide";
import styled from "styled-components";
import { IconSearch } from "../icon";

const SearchStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 25px;
  border: 1px solid #eee;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  position: relative;
  .search-input {
    flex: 1;
    padding-right: 80px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    background-color: #ff6651;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
    right: 4px;
    cursor: pointer;
  }
`;

const InputSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const { show, setShow, nodeRef } = useClickOutSide(".search-header");
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  // const handleClearValue = () => {
  //   setSearchValue("");
  // };
  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const handleFetchProduct = async () => {
      setIsLoading(true);
      setShow(true);
      let start = new Date();
      try {
        const data = await axiosClient.request({
          method: "get",
          url: `/getProductAll?search=${debouncedSearchTerm}`,
        });
        setListProduct(data);
      } catch (error) {
        toast.error("Sever error");
      }
      let end = new Date();
      if (end - start > 1000) {
        setIsLoading(false);
      } else {
        await delay(1000 - (end - start));
        setIsLoading(false);
      }
    };
    if (debouncedSearchTerm) {
      handleFetchProduct();
    } else {
      setListProduct([]);
    }
  }, [debouncedSearchTerm, setShow]);
  console.log(listProduct);
  return (
    <SearchStyles>
      <input
        ref={nodeRef}
        onClick={() => {
          setShow(!show);
        }}
        value={searchValue}
        onChange={handleInputChange}
        type="text"
        className="search-input"
        placeholder="Tìm kiếm sách..."
      />
      <IconSearch className="search-icon"></IconSearch>

      {/* <div className="flex items-center flex-1 w-full text-sm border-b-2 border-gray-300 div-search search-header">
        {searchValue && <IconClose onClick={handleClearValue} />}
      </div> */}
      {/* <List data={listProduct} loading={isLoading} show={show}></List> */}
    </SearchStyles>
  );
};
InputSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  clearValue: PropTypes.func,
};
export default InputSearch;
