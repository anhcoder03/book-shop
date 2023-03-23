import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import axiosClient from "../axios/configAxios";
import { Button } from "../components/button";
import Field from "../components/field/Field";
import ImageUpload from "../components/image/ImageUpload";
import { Input } from "../components/input";
import Label from "../components/label/Label";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import useFirebaseImage from "../hooks/useFirebaseImage";
import { useNavigate } from "react-router-dom";

const FormUpdateStyles = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
`;

function UserProfile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const userId = user?._id;
  const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
  });
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    getValues,
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
        url: `/getUser/${userId}`,
      });
      reset(data);
      setImage(data.image);
    };
    handleGetUser();
  }, [userId]);
  const handleUpdateProfile = async (values) => {
    if (!isValid) return;
    try {
      await axiosClient
        .request({
          method: "put",
          url: `/updateUser/${userId}`,
          data: { ...values, image },
          headers: {
            token: `Bearer ${accessToken}`,
          },
        })
        .then((data) => {
          toast.success("Cập nhật thành công");
          navigate("/");
        });
    } catch (error) {
      console.log(error);
      const message = error.response.message;
      toast.error(message);
    }
  };
  return (
    <div>
      <Header></Header>
      <Menu></Menu>
      <div className="container">
        <h1 className="mt-10 text-3xl font-bold">Cập nhật profile</h1>
        <FormUpdateStyles
          className="form"
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <Field>
            <Label htmlFor="image">Ảnh đại diện</Label>
            <div className="w-[300px] h-[300px] mx-auto rounded-full mb-10 overflow-hidden">
              <ImageUpload
                onChange={handleSelectImage}
                progress={progress}
                image={image}
                handleDeleteImage={handleDeleteImage}
              ></ImageUpload>
            </div>
          </Field>
          <div className="form-layout">
            <Field>
              <Label htmlFor="fullname">FullName</Label>
              <Input
                type="text"
                name="fullname"
                placeholder="Please enter you fullname"
                control={control}
              ></Input>
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
          </div>
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
            Cập nhật profile
          </Button>
        </FormUpdateStyles>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default UserProfile;
