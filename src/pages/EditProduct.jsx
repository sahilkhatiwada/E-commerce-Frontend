import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { productCategories } from "../constant/general.constant";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../store/slices/snackbarSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const { id: productId } = useParams();
  const navigate = useNavigate();

  // get product details
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });

  const productDetails = data?.data?.productDetails;

  // edit product
  const { isLoading: editProductLoading, mutate } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      return await $axios.put(`/product/edit/${productId}`, values);
    },
    onSuccess: (res) => {
      navigate(`/product-detail/${productId}`);
      dispatch(openSuccessSnackBar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackBar(error?.response?.data?.message));
    },
  });
  if (isLoading || editProductLoading || imageLoading) {
    return <Loader />;
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: productDetails?.name || "",
          brand: productDetails?.brand || "",
          price: productDetails?.price || 0,
          quantity: productDetails?.quantity || 1,
          category: productDetails?.category || "",
          freeShipping: productDetails?.freeShipping || false,
          description: productDetails?.description || "",
          image: null,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Name is required.")
            .trim()
            .max(55, "Name must be at max 55 characters."),
          brand: Yup.string()
            .required("Brand is required.")
            .trim()
            .max(55, "Brand must be at max 55 characters."),
          price: Yup.number()
            .min(0, "Price must be at least 0.")
            .required("Price is required."),
          quantity: Yup.number()
            .min(1, "Quantity must be at least 1.")
            .required("Quantity is required."),
          category: Yup.string()
            .required("Select a category.")
            .trim()
            .oneOf(productCategories),
          freeShipping: Yup.boolean().default(false),
          description: Yup.string()
            .required("Description is required.")
            .trim()
            .min(500, "Description must be at least 500 characters.")
            .max(1000, "Description must be at max 1000 characters."),
          image: Yup.string().trim().nullable(),
        })}
        onSubmit={async (values) => {
          let imageUrl;

          if (productImage) {
            const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

            const data = new FormData();

            data.append("file", productImage);
            data.append("upload_preset", upload_preset);
            data.append("cloud_name", cloudname);
            try {
              setImageLoading(true);
              const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
                data
              );

              imageUrl = res?.data?.secure_url;

              setImageLoading(false);
            } catch (error) {
              setImageLoading(false);
              console.log("File upload failed");
            }
          }

          values.image = imageUrl;
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, touched, errors, values }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1.5rem",
              width: "450px",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <Typography variant="h5" textAlign="center">
              Edit product
            </Typography>

            <Stack sx={{ height: "250px" }}>
              {(localUrl || productDetails?.image) && (
                <img
                  src={localUrl || productDetails?.image}
                  alt={productDetails?.name}
                  style={{ height: "100%" }}
                />
              )}
            </Stack>

            <FormControl>
              <input
                type="file"
                onChange={(event) => {
                  const file = event?.target?.files[0];
                  setProductImage(file);
                  setLocalUrl(URL.createObjectURL(file));
                }}
              />
            </FormControl>

            <FormControl>
              <TextField label="Name" {...getFieldProps("name")} />
              {touched.name && errors.name ? (
                <FormHelperText error>{errors.name}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <TextField label="Brand" {...getFieldProps("brand")} />
              {touched.brand && errors.brand ? (
                <FormHelperText error>{errors.brand}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <TextField
                label="Price"
                {...getFieldProps("price")}
                type="number"
              />
              {touched.price && errors.price ? (
                <FormHelperText error>{errors.price}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <TextField
                label="Quantity"
                {...getFieldProps("quantity")}
                type="number"
              />
              {touched.quantity && errors.quantity ? (
                <FormHelperText error>{errors.quantity}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
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
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Typography>Free shipping</Typography>
                <Checkbox
                  checked={values.freeShipping}
                  {...getFieldProps("freeShipping")}
                />
              </Stack>
            </FormControl>

            <FormControl>
              <TextField
                label="Description"
                multiline
                rows={7}
                {...getFieldProps("description")}
              />
              {touched.description && errors.description ? (
                <FormHelperText error>{errors.description}</FormHelperText>
              ) : null}
            </FormControl>

            <Button variant="contained" color="success" type="submit">
              submit
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditProduct;
