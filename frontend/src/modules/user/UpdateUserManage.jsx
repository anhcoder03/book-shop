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
import { useSelector } from "react-redux";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";

const FormUpdateStyles = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
`;
const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  username: yup.string().required("Please enter your username"),
  image: yup.string().required("Please enter your avatar"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
});

const UpdateUserManage = () => {
  let { id } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);
  useEffect(() => {
    const handleGetUser = async () => {
      const data = await axiosClient.request({
        method: "get",
        url: `getUser/${id}`,
      });
      reset(data);
      setImage(data.image);
    };
    handleGetUser();
  }, [id]);
  const handleUpdate = async (values) => {
    if (!isValid) return;
    try {
      await axiosClient
        .request({
          method: "put",
          url: `/updateUser/${id}`,
          data: { ...values, image },
          headers: {
            token: `Bearer ${accessToken}`,
          },
        })
        .then((data) => {
          toast.success("Cập nhật thành công");
          navigate("/manage/user");
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
      <FormUpdateStyles className="form" onSubmit={handleSubmit(handleUpdate)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Please enter you fullname"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Please enter you username"
            control={control}
            disabled
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="image">Ảnh sản phẩm</Label>
          <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10 overflow-hidden">
            <ImageUpload
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </div>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            placeholder="Please enter you email"
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
          Update User
        </Button>
      </FormUpdateStyles>
    </div>
  );
};

export default UpdateUserManage;
