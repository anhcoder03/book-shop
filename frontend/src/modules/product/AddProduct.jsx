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

const AddProduct = () => {
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState([]);
  let listSlugCategory = [];
  listCategory.length > 0 &&
    listCategory.map((item) => listSlugCategory.push(item?.slug));
  const schema = yup.object({
    category: yup
      .string()
      .required("Vui lòng phân loại danh mục!")
      .oneOf(listSlugCategory),
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
    image: yup.string().required("Vui lòng nhập ảnh sản phẩm!"),
  });
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

  const handleCreateProduct = async (values) => {
    if (!isValid) return;
    try {
      await axiosClient
        .request({
          method: "post",
          url: `/create_product`,
          data: values,
        })
        .then((data) => {
          toast.success("Thêm sản phẩm thành công");
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
      <DashboardHeading title="Update User"></DashboardHeading>
      <FormUpdateStyles
        className="form"
        onSubmit={handleSubmit(handleCreateProduct)}
      >
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
          <Label htmlFor="image">Ảnh sản phẩm</Label>
          <Input
            type="text"
            name="image"
            placeholder="Please enter you image"
            control={control}
          ></Input>
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
          Thêm sản phẩm
        </Button>
      </FormUpdateStyles>
    </div>
  );
};

export default AddProduct;
