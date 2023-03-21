import React from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import ListProduct from "../components/product/ListProduct";

function ProductPage() {
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container">
        <ListProduct></ListProduct>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductPage;
