import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";

const DescriptionStyle = styled.div`
  padding: 30px;
  margin-top: 30px;
  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .description-heading {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .desc-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;
function ProductDescription({ desc }) {
  return (
    <DescriptionStyle>
      <h1 className="description-heading">Mô tả</h1>
      <div className="entry-content">{parse(desc || "")}</div>
    </DescriptionStyle>
  );
}

export default ProductDescription;
