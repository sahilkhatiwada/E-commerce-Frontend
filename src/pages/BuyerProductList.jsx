import React, { useState } from "react";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import NoitemFound from "../components/NoitemFound";

const BuyerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchText, category, minPrice, maxPrice, isFilterApplied } =
    useSelector((state) => state.product);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      "buyer-product-list",
      currentPage,
      searchText,
      category,
      minPrice,
      maxPrice,
      isFilterApplied,
    ],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 6,
        searchText,
        category: category ? category : null,
        minPrice,
        maxPrice,
      });
    },
  });

  const productList = data?.data?.productList;
  const numberOfPages = data?.data?.numberOfPages;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {productList.length > 0 ? (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",

              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            {productList?.map((item) => {
              return <ProductCard key={item._id} {...item} />;
            })}
          </Box>
          <Stack alignItems="center" mt="1.5rem">
            <Pagination
              count={numberOfPages}
              page={currentPage}
              onChange={(_, page) => {
                setCurrentPage(page);
              }}
            />
          </Stack>
        </>
      ) : (
        <NoitemFound />
      )}
    </>
  );
};

export default BuyerProductList;
