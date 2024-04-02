import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getSellerProducts } from "../lib/apis";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const SellerProductList = () => {
  const navigate = useNavigate();

  const goToAddProduct = () => {
    navigate("/add-product");
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["seller-product-list"],
    queryFn: () => {
      return getSellerProducts();
    },
  });

  const productList = data?.data?.productList;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Stack alignItems="center" mb="1rem">
        <Button variant="contained" color="success" onClick={goToAddProduct}>
          Add product
        </Button>
      </Stack>

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
    </Box>
  );
};

export default SellerProductList;
