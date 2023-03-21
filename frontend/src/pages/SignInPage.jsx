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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiRequest";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.login.error);
  const authSuccess = useSelector((state) => state.auth.login.currentUser);
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
    login(values, dispatch, navigate);
  };
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.error(arrayError[0]?.message);
    }
  }, [errors]);
  useEffect(() => {
    if (authError) toast.error(authError.message);
  }, [authError]);
  useEffect(() => {
    if (authSuccess) toast.success(authSuccess.message);
  }, [authSuccess]);
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SignInPage;
