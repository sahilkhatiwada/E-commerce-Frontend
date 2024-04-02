import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import { openErrorSnackBar } from "../store/slices/snackbarSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (response) => {
      // save token , user role and user name in local storage
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userRole", response?.data?.user?.role);
      localStorage.setItem("firstName", response?.data?.user?.firstName);
      localStorage.setItem("lastName", response?.data?.user?.lastName);
      localStorage.setItem("isLoggedIn", true);

      navigate("/home");
    },
    onError: (error) => {
      dispatch(openErrorSnackBar(error?.response?.data?.message));
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {isLoading && <LinearProgress color="success" />}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Must be valid email.")
            .required("Email is required.")
            .trim()
            .lowercase(),
          password: Yup.string().required("Password is required.").trim(),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, touched, errors }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1.5rem",
              width: "400px",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <Typography variant="h5">Sign in</Typography>
            <FormControl>
              <TextField label="Email" {...getFieldProps("email")} />

              {touched.email && errors.email ? (
                <FormHelperText error> {errors.email}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <TextField label="Password" {...getFieldProps("password")} />

              {touched.password && errors.password ? (
                <FormHelperText error> {errors.password}</FormHelperText>
              ) : null}
            </FormControl>

            <Button type="submit" variant="contained" color="success">
              Log in
            </Button>

            <Stack direction="row" justifyContent="space-between">
              <Link to="/forgot-password">Forgot password?</Link>
              <Link to="/register">
                <Typography variant="subtitle2">New here? Register</Typography>
              </Link>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
