import { useState } from "react";

// material-ui
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSuccessSnackBar } from "../store/slices/snackbarSlice";
import Loader from "../components/Loader";

// project imports

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [code, setCode] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  });

  const handleChange = (event, name) => {
    const re = /^[0-9\b]+$/;
    if (
      event.target?.value.length < 2 &&
      (event.target?.value === "" || re.test(event.target?.value))
    ) {
      setCode({ ...code, [name]: event.target?.value });
    }
  };

  const inputSX = {
    ...theme.typography.customInput,
    "& > div > input": {
      p: { xs: 1.5, md: 2 },
      textAlign: "center",
    },
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async () => {
      return await $axios.post("/otp/verify", {
        email: localStorage.getItem("email"),
        otp:
          code.code1 +
          code.code2 +
          code.code3 +
          code.code4 +
          code.code5 +
          code.code6,
      });
    },

    onSuccess: (res) => {
      dispatch(openSuccessSnackBar(res?.data?.message));
      navigate("/reset-password");
    },
    onError: (error) => {
      dispatch(error?.response?.data?.message);
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "2rem",
        width: "600px",
      }}
    >
      <Stack alignItems="center">
        <Typography variant="h6">Enter Verification Code</Typography>
        <Typography>We send you on email.</Typography>
        <Typography>We have sent you code on :xyz@gmail.com</Typography>
      </Stack>

      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname1"
            type="text"
            value={code.code1}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code1")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname2"
            type="text"
            value={code.code2}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code2")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname3"
            type="text"
            value={code.code3}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code3")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname4"
            type="text"
            value={code.code4}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code4")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname4"
            type="text"
            value={code.code5}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code5")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname4"
            type="text"
            value={code.code6}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code6")}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={() => {
            mutate();
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default OtpVerification;
