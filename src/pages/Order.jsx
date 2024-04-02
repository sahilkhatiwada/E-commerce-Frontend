import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

const tableHeaders = [
  "S.N.",
  "Product",
  "Ordered Quantity",
  "Unit Price",
  "Sub total",
  "Buyer Name",
  "Buyer Email",
  "Payment Status",
];
const OrderTable = () => {
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["get-order-details"],
    queryFn: async () => {
      return await $axios.get("/order/list");
    },
    onError: (err) => {
      dispatch(err?.response?.data?.message);
    },
  });

  const orderList = data?.data?.orderList;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant="h5">Order list</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((item, index) => {
                return (
                  <TableCell key={index} align="center">
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList?.map((item, index) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{item.productData.name}</TableCell>
                <TableCell align="center">{item.orderedQuantity}</TableCell>
                <TableCell align="center">${item.unitPrice}</TableCell>
                <TableCell align="center">${item.subTotal}</TableCell>
                <TableCell align="center">{`${item.buyerData.firstName} ${item.buyerData.lastName} `}</TableCell>
                <TableCell align="center">{item.buyerData.email}</TableCell>
                <TableCell align="center" sx={{ color: "green" }}>
                  {item.paymentStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderTable;
