import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import axiosClient from "../axios/configAxios";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import * as yup from "yup";
import ProductDescription from "../components/product_detail/ProductDescription";
import ProductDetailMain from "../components/product_detail/ProductDetailMain";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { toast } from "react-toastify";
import { Input } from "../components/input";
import Radio from "../components/radio/Radio";
import StarRating from "../components/rating/StarRating";
import { Textarea } from "../components/textarea";
import styled from "styled-components";
import ConvertTime from "../utils/convertTime";
import convertTimestampToDateTime from "../utils/convertTime";

const CommentStyles = styled.div`
  margin-top: 30px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

function ProductDetailPage() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const username = user?.username;
  const userImage = user?.image;
  const accessToken = user?.accessToken;
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [listComment, setListComment] = useState([]);
  const schema = yup.object({
    review: yup.string().required("Vui long nhập nội dung đánh giá"),
  });
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      rating: "5",
    },
  });
  const watchRating = watch("rating");
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
  const {
    _id,
    image,
    title,
    price,
    year,
    desc,
    author,
    average_score,
    review_count,
  } = product;
  console.log(product);
  const productId = _id;
  useEffect(() => {
    const handleGetComment = async () => {
      const response = await axiosClient.request({
        method: "get",
        url: `getCommentAll/${_id}`,
      });
      setListComment(response.data);
    };
    handleGetComment();
  }, [_id]);
  const handleSubmitComment = async (values) => {
    if (!isValid) return;
    try {
      await axiosClient
        .request({
          method: "post",
          url: `/addComment`,
          data: { ...values, username, productId, userImage },
          headers: {
            token: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          toast.success("Bình luận sản phẩm thành công");
        });
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    }
  };
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.error(arrayError[0]?.message);
    }
  }, [errors]);
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
          averageScore={average_score}
          reviewCount={review_count}
        ></ProductDetailMain>
        <ProductDescription title={title} desc={desc}></ProductDescription>
        <CommentStyles className="comment-wrraper">
          <h1 className="text-3xl font-bold">Đánh giá</h1>
          <div className="listComment mt-8">
            {listComment.length > 0 ? (
              listComment.map((item) => (
                <div key={item._id} className="mb-4">
                  <div className="flex gap-x-4 items-center">
                    <img
                      src={item?.userImage}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                      alt={item.title}
                    />
                    <div className="">
                      <p className="font-medium">{item.username}</p>
                      <p className="flex items-center">
                        {<StarRating rating={item.rating}></StarRating>}
                        <span className="px-2">{item.rating}.0</span>
                        <span>
                          {convertTimestampToDateTime(item.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm">{item.review}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-primary">
                Chưa có đánh giá nào cho sản phẩm này.
              </p>
            )}
          </div>
          {!user ? (
            <div>
              <h1 className=" mt-10 text-lg font-semibold">
                Để lại đánh giá cho sản phẩm này
              </h1>
              <p className="mt-10 text-center">
                Đăng nhập mới có thể đánh giá sản phẩm.
              </p>
              <NavLink
                to="/sign-in"
                className={"mt-2 text-center text-blue-400 block"}
              >
                Đăng nhập
              </NavLink>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleSubmitComment)}
              className="comment"
            >
              <h1 className=" mt-10 text-lg font-semibold">
                Để lại đánh giá cho sản phẩm này
              </h1>
              <div className="rating mt-5 ">
                <h3 className="font-semibold text-[#666]">Đánh giá sao *</h3>
                <span className="flex gap-x-1">
                  <Radio
                    name="rating"
                    control={control}
                    value="1"
                    checked={watchRating === "1"}
                  ></Radio>
                  <Radio
                    name="rating"
                    control={control}
                    value="2"
                    checked={watchRating === "2"}
                  ></Radio>
                  <Radio
                    name="rating"
                    control={control}
                    value="3"
                    checked={watchRating === "3"}
                  ></Radio>
                  <Radio
                    name="rating"
                    control={control}
                    value="4"
                    checked={watchRating === "4"}
                  ></Radio>
                  <Radio
                    name="rating"
                    control={control}
                    value="5"
                    checked={watchRating === "5"}
                  ></Radio>
                </span>
              </div>
              <Textarea
                children={"Viết đánh giá cho sản phẩm này *"}
                name={"review"}
                control={control}
              ></Textarea>
              <Button
                type="submit"
                style={{
                  maxWidth: 300,
                  margin: "0 auto",
                }}
                width={"100%"}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Bình luận
              </Button>
            </form>
          )}
        </CommentStyles>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductDetailPage;
