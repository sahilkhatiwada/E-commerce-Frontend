import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import snackbarReducer from "./slices/snackbarSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    snackbar: snackbarReducer,
    payment: paymentReducer,
  },
});

export default store;
