import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Input } from "../components/input";
import { Label } from "../components/label";
import AuthenticationPage from "./AuthenticationPage";
import { toast } from "react-toastify";
import axiosClient from "../axios/configAxios";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../contexts/auth-context";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo?.fullname) {
      navigate("/");
      toast.error("Vui lòng đăng xuất tài khoản để đăng nhập lại!");
    }
  }, [userInfo]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await axiosClient
        .request({
          method: "post",
          url: "/login",
          data: { ...values },
        })
        .then(({ data }) => {
          localStorage.setItem("user", JSON.stringify(data));
          toast.success("Bạn đã đăng nhập thành công");
          navigate("/");
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
    <Fragment>
      {!userInfo ? (
        <AuthenticationPage>
          <form
            className="form"
            onSubmit={handleSubmit(handleSignIn)}
            autoComplete="off"
          >
            <Field>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                placeholder="Please enter you email address"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input
                type={togglePassword ? "text" : "password"}
                name="password"
                placeholder="Please enter you password"
                control={control}
              >
                {!togglePassword ? (
                  <IconEyeClose
                    onClick={() => {
                      setTogglePassword((t) => !t);
                    }}
                  ></IconEyeClose>
                ) : (
                  <IconEyeOpen
                    onClick={() => {
                      setTogglePassword((t) => !t);
                    }}
                  ></IconEyeOpen>
                )}
              </Input>
            </Field>
            <div className="have-account">
              You have not had an account?
              <NavLink to={"/sign-up"}>Register an account</NavLink>
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
              Sign In
            </Button>
          </form>
        </AuthenticationPage>
      ) : null}
    </Fragment>
  );
};

export default SignInPage;
