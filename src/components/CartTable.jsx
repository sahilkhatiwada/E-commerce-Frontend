import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMutation, useQuery, useQueryClient } from "react-query";
import $axios from "../lib/axios.instance";
import Loader from "./Loader";
import { fallbackImage } from "../constant/general.constant";
import { useDispatch } from "react-redux";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../store/slices/snackbarSlice";

const CartTable = ({ cartItems }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { isLoading: removeItemLoading, mutate } = useMutation({
    mutationKey: ["remove-cart-item"],
    mutationFn: async (productId) => {
      return await $axios.delete(`/cart/item/remove/${productId}`);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries("get-cart-items");
      queryClient.invalidateQueries("get-cart-item-count");
      dispatch(openSuccessSnackBar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackBar(error?.response?.data?.message));
    },
  });

  const { isLoading: flushCartLoading, mutate: flushCartMutate } = useMutation({
    mutationKey: ["flush-cart"],
    mutationFn: async () => {
      return await $axios.delete("/cart/flush");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries("get-cart-items");
      queryClient.invalidateQueries("get-cart-item-count");

      dispatch(openSuccessSnackBar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackBar(error?.response?.data?.message));
    },
  });

  const {
    isLoading: updateCartQuantityLoading,
    mutate: updateCartQuantityMutate,
  } = useMutation({
    mutationKey: ["update-cart-quantity"],
    mutationFn: async ({ productId, action }) => {
      return await $axios.put(`/cart/update/quantity/${productId}`, {
        action,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-items");
    },
    onError: (error) => {
      dispatch(openErrorSnackBar(error?.response?.data?.message));
    },
  });

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            width: { xs: "100%", md: "200px" },
            alignItems: { xs: "center", md: "right" },
          }}
          onClick={() => {
            flushCartMutate();
          }}
        >
          <Typography>Clear cart</Typography>
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {(removeItemLoading ||
          flushCartLoading ||
          updateCartQuantityLoading) && <LinearProgress color="secondary" />}
        <TableContainer
          component={Paper}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    S.N.
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Image
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Unit price
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Subtotal
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems?.map((item, index) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell align="right">
                      <Typography variant="h6">{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <img
                        src={item?.image || fallbackImage}
                        alt=""
                        width="200px"
                        height="200px"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        spacing={2}
                        sx={{ justifyContent: "center", alignItems: "center" }}
                      >
                        <Typography variant="h6">{item?.name}</Typography>
                        <Chip
                          label={item?.brand}
                          color="secondary"
                          variant="outlined"
                        />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <IconButton
                          disabled={
                            updateCartQuantityLoading ||
                            item?.orderedQuantity === 1
                          }
                          onClick={() => {
                            updateCartQuantityMutate({
                              productId: item?.productId,
                              action: "dec",
                            });
                          }}
                        >
                          <RemoveOutlinedIcon />
                        </IconButton>
                        <Typography variant="h6">
                          {item?.orderedQuantity}
                        </Typography>
                        <IconButton
                          disabled={updateCartQuantityLoading}
                          onClick={() => {
                            updateCartQuantityMutate({
                              productId: item?.productId,
                              action: "inc",
                            });
                          }}
                        >
                          <AddOutlinedIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Rs.{item?.price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        Rs.{item?.orderedQuantity * item?.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          mutate(item?.productId);
                        }}
                      >
                        <ClearOutlinedIcon
                          color="error"
                          sx={{ cursor: "pointer" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};

export default CartTable;
