import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "../components/ProductFilter";
import SearchBar from "../components/SearchBar";
import { clearProductFilter } from "../store/slices/productSlice";
import BuyerProductList from "./BuyerProductList";
import SellerProductList from "./SellerProductList";

const ProductList = () => {
  const userRole = localStorage.getItem("userRole");
  const dispatch = useDispatch();

  const { isFilterApplied } = useSelector((state) => state.product);

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ margin: "4rem", alignItems: "flex-end", gap: "1rem" }}
      >
        <SearchBar />

        <ProductFilter />
        {isFilterApplied && (
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(clearProductFilter())}
          >
            clear filter
          </Button>
        )}
      </Stack>

      {userRole === "buyer" ? <BuyerProductList /> : <SellerProductList />}
    </Box>
  );
};

export default ProductList;
