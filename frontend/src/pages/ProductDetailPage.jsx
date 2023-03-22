import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios/configAxios";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import ProductDescription from "../components/product_detail/ProductDescription";
import ProductDetailMain from "../components/product_detail/ProductDetailMain";

function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const handleGetProduct = async () => {
      const response = await axiosClient.request({
        method: "get",
        url: `getProduct/${slug}`,
      });
      setProduct(response.data);
    };
    handleGetProduct();
  }, [slug]);
  const { _id, image, title, price, year, desc, author } = product;
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container">
        <ProductDetailMain
          image={image}
          title={title}
          author={author}
          year={year}
          price={price}
        ></ProductDetailMain>
        <ProductDescription title={title} desc={desc}></ProductDescription>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductDetailPage;
