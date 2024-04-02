import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { productCategories } from "../constant/general.constant";
import { useDispatch, useSelector } from "react-redux";
import { setProductFilter } from "../store/slices/productSlice";
import { openErrorSnackBar } from "../store/slices/snackbarSlice";

const ProductFilter = () => {
  const { category, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Filter product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Product Filter</DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <Formik
            initialValues={{
              category,
              minPrice,
              maxPrice,
            }}
            validationSchema={Yup.object({
              category: Yup.string().trim().oneOf(productCategories),
              minPrice: Yup.number().min(0),
              maxPrice: Yup.number().min(0),
            })}
            onSubmit={(values) => {
              if (values.maxPrice < values.minPrice) {
                dispatch(
                  openErrorSnackBar("Max price must be greater than min price.")
                );
              } else {
                dispatch(setProductFilter(values));
                handleClose();
              }
            }}
          >
            {({ handleSubmit, touched, errors, getFieldProps }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select label="Category" {...getFieldProps("category")}>
                    {productCategories.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category && errors.category ? (
                    <FormHelperText error>{errors.category}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label="Min price"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...getFieldProps("minPrice")}
                  />
                  {touched.minPrice && errors.minPrice ? (
                    <FormHelperText error>{errors.minPrice}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label="Max Price"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...getFieldProps("maxPrice")}
                  />
                  {touched.maxPrice && errors.maxPrice ? (
                    <FormHelperText error>{errors.maxPrice}</FormHelperText>
                  ) : null}
                </FormControl>

                <Stack alignItems="flex-end">
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="error"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="success">
                      Apply
                    </Button>
                  </Box>
                </Stack>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductFilter;
