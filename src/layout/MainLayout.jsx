import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import CustomSnackbar from "../components/CustomSnackbar";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",

          flexWrap: "wrap",
        }}
      >
        <Outlet />
      </Box>
      <CustomSnackbar />

      <Footer />
    </Box>
  );
};

export default MainLayout;
