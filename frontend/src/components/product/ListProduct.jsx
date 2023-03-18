import React from "react";
import styled from "styled-components";

const ListProductStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const ListProduct = () => {
  return <ListProductStyles></ListProductStyles>;
};

export default ListProduct;
