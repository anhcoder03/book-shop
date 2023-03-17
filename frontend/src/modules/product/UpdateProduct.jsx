import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axiosClient from "../../axios/configAxios";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { toast } from "react-toastify";
import DashboardHeading from "../../drafts/DashboardHeading";
import DropdownCategory from "../../drafts/DropdownCategory";

const FormUpdateStyles = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
`;
const schema = yup.object({
  title: yup.string().required("Vui lòng nhập tên title!"),
  author: yup.string().required("Vui lòng nhập tên author!"),
  year: yup
    .number("Năm phải là số")
    .min(0, "Năm xuất bản phải lớn hơn 0")
    .required("Vui lòng nhập năm xuất bản!"),
  price: yup
    .number()
    .min(0, "Giá phải lớn hơn 0")
    .required("Vui lòng nhập giá sản phẩm!"),
  desc: yup.string().required("Vui lòng nhập mô tả sản phẩm!"),
  category: yup
    .string()
    .required("Vui lòng phân loại danh mục!")
    .oneOf(["sach-thieu-nhi", "sach-tieng-anh", "sach-van-hoc"]),
});

const UpdateProduct = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState([]);
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const handleGetUser = async () => {
      const data = await axiosClient.request({
        method: "get",
        url: `getProduct/${id}`,
      });
      reset(data.data);
    };
    handleGetUser();
  }, [id]);

  const getCategories = async () => {
    try {
      const data = await axiosClient.request({
        method: "get",
        url: "/get_category_all",
      });

      setListCategory(data.data);
    } catch (error) {
      toast.error("Sever error");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleUpdateProduct = async (values) => {
    if (!isValid) return;
    try {
      await axiosClient
        .request({
          method: "put",
          url: `/update_product/${id}`,
          data: values,
        })
        .then((data) => {
          console.log(data);
          toast.success("Cập nhật danh mục thành công");
          navigate("/manage/product");
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
    <div>
      <DashboardHeading title="Cập nhật sản phẩm"></DashboardHeading>
      <FormUpdateStyles
        className="form"
        onSubmit={handleSubmit(handleUpdateProduct)}
      >
        <Field>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Please enter you tilte"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="author">Author</Label>
          <Input
            type="text"
            name="author"
            placeholder="Please enter you author"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="year">Năm xuất bản</Label>
          <Input
            type="number"
            name="year"
            placeholder="Please enter you year"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="price">Giá</Label>
          <Input
            type="number"
            name="price"
            placeholder="Please enter you price"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="desc">Mô tả</Label>
          <Input
            type="text"
            name="desc"
            placeholder="Please enter you description"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="category">Danh mục</Label>
          <DropdownCategory
            control={control}
            setValue={setValue}
            name="category"
            data={listCategory}
            dropdownLabel="Phân loại danh mục"
          ></DropdownCategory>
        </Field>
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
          Cập nhật sản phẩm
        </Button>
      </FormUpdateStyles>
    </div>
  );
};

export default UpdateProduct;