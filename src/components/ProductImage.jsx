import { Box, Stack } from "@mui/material";
import React from "react";
import { fallbackImage } from "../constant/general.constant";

const ProductImage = (props) => {
  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "50%",
        },
      }}
    >
      <img
        src={props.imageUrl || fallbackImage}
        alt=""
        style={{
          width: "100%",
          height: "600px",
        }}
      />
    </Box>
  );
};

export default ProductImage;
