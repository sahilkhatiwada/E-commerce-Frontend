import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../store/slices/snackbarSlice";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ orderSummary, grandTotal, productDataForOrdering }) => {
  console.log(productDataForOrdering);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["initiate-khalti-payment"],
    mutationFn: async () => {
      return await $axios.post("/payment/khalti/start", {
        amount: grandTotal,
        productList: productDataForOrdering,
      });
    },

    onSuccess: (res) => {
      const paymentUrl = res?.data?.paymentDetails?.payment_url;
      window.location.href = paymentUrl;
    },
    onError: (error) => {
      dispatch(openErrorSnackBar(error?.response?.data?.message));
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "2rem",
        maxHeight: "250px",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Typography variant="h5">Order summary</Typography>
      {orderSummary.map((item, index) => {
        return (
          <Stack
            direction="row"
            spacing={2}
            key={index}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography sx={{ textTransform: "capitalize" }}>
              {item?.name}:
            </Typography>
            <Typography>Rs.{item?.value}</Typography>
          </Stack>
        );
      })}

      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => mutate()}
      >
        pay with khalti
      </Button>
    </Box>
  );
};

export default OrderSummary;
