import { Box } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import CartTable from "../components/CartTable";
import Loader from "../components/Loader";
import NoCartItem from "../components/NoCartItem";
import OrderSummary from "../components/OrderSummary";
import $axios from "../lib/axios.instance";

const Cart = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-cart-items"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartItems = data?.data?.cartItems;
  const orderSummary = data?.data?.orderSummary;
  const grandTotal = data?.data?.grandTotal;

  const productDataForOrdering = cartItems?.map((item) => {
    return {
      productId: item?.productId,
      orderedQuantity: item?.orderedQuantity,
      sellerId: item?.sellerId,
      unitPrice: item?.price,
      subTotal: item?.subTotal,
    };
  });

  if (isLoading) {
    return <Loader />;
  }

  if (cartItems?.length === 0) {
    return <NoCartItem />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "4rem", md: null },
          justifyContent: "space-around",
        }}
      >
        <CartTable cartItems={cartItems} />
        <OrderSummary
          orderSummary={orderSummary}
          grandTotal={grandTotal}
          productDataForOrdering={productDataForOrdering}
        />
      </Box>
    </>
  );
};

export default Cart;
