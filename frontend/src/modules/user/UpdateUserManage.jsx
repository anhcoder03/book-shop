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

const HeaderUserManageStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .dashboard-heading {
    font-weight: 600;
    font-size: 28px;
  }
`;
const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
  avatar: yup.string().required("Please enter your avatar"),
});

const UpdateUserManage = () => {
  let { id } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const {
    control,
    reset,
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
        url: `getUser/${id}`,
      });
      reset(data);
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
          data: values,
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
      <HeaderUserManageStyles>
        <h1 className="dashboard-heading">Update User</h1>
      </HeaderUserManageStyles>
      <form className="form" onSubmit={handleSubmit(handleUpdate)}>
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
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type="text"
            name="password"
            placeholder="Please enter you password"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            type="text"
            name="avatar"
            placeholder="Please enter you avatar"
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
      </form>
    </div>
  );
};

export default UpdateUserManage;
