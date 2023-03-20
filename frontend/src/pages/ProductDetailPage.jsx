import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";

function ProductDetailPage() {
  const { slug } = useParams();
  console.log(slug);
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container"></div>
      <Footer></Footer>
    </>
  );
}

export default ProductDetailPage;
