import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentSuccessStatus: false,
  },
  reducers: {
    togglePaymentStatus: (state) => {
      state.paymentSuccessStatus = !state.paymentSuccessStatus;
    },
  },
});

export const { togglePaymentStatus } = paymentSlice.actions;

export default paymentSlice.reducer;
