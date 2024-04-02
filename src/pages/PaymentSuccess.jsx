import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { openErrorSnackBar } from "../store/slices/snackbarSlice";
import { togglePaymentStatus } from "../store/slices/paymentSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const pidx = searchParams.get("pidx");

  const { isLoading, data } = useQuery({
    queryKey: ["verify-payment"],
    queryFn: async () => {
      return await $axios.post("/payment/khalti/verify", {
        pidx,
      });
    },
    onError: (error) => {
      dispatch(openErrorSnackBar(error?.response?.data?.message));
    },
    onSuccess: () => {
      dispatch(togglePaymentStatus());
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Khalti payment is successful.</Typography>
      <Typography variant="h6">Thanks for shopping with us.</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          navigate("/products");
        }}
      >
        keep shopping
      </Button>
    </Stack>
  );
};

export default PaymentSuccess;
