import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
    color: "success",
  },
  reducers: {
    openSuccessSnackBar: (state, action) => {
      state.open = true;
      state.message = action.payload;
      state.color = "success";
    },
    openErrorSnackBar: (state, action) => {
      state.open = true;
      state.message = action.payload || "Something went wrong.";
      state.color = "error";
    },

    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSuccessSnackBar, closeSnackbar, openErrorSnackBar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
