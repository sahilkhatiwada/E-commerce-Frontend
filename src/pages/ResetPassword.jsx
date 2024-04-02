import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../store/slices/snackbarSlice";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (values) => {
      return await $axios.put("/otp/change-password", {
        email: localStorage.getItem("email"),
        newPassword: values.newPassword,
      });
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackBar(res?.data?.message));
      navigate("/login");
      localStorage.clear();
    },
    onError: (error) => {
      dispatch(openErrorSnackBar(error?.response?.data.message));
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Box
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "1rem",
          width: "400px",
        }}
      >
        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          validationSchema={Yup.object({
            newPassword: Yup.string()
              .required("Password is required.")
              .trim()
              .min(4, "Password must be at least 4 characters.")
              .max(20, "Password must be at max 20 characters."),

            confirmNewPassword: Yup.string().oneOf(
              [Yup.ref("newPassword"), null],
              "Password must match."
            ),
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
                gap: "1rem",
              }}
            >
              <Typography variant="h5" textAlign="center">
                Reset password
              </Typography>
              <Typography textAlign="center">
                {` Please choose your new password.`}
              </Typography>
              <FormControl>
                <TextField label="Password" {...getFieldProps("newPassword")} />
                {touched.newPassword && errors.newPassword ? (
                  <FormHelperText error>{errors.newPassword}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <TextField
                  label="Confirm password"
                  {...getFieldProps("confirmNewPassword")}
                />
                {touched.confirmNewPassword && errors.confirmNewPassword ? (
                  <FormHelperText error>
                    {errors.confirmNewPassword}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button color="secondary" variant="contained" type="submit">
                reset password
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ResetPassword;
