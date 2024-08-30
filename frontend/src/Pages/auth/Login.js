import React, { useEffect, useState } from "react";
import home from "../../Assets/Svg/home.svg";
import { TextField, Typography, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/auth/action";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loading, error, isAuthenticated, userInfo } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      toast.success("Login successful");
      if (userInfo?.data?.userType === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/jobs");
      }
    }
  }, [error, isAuthenticated, userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return toast.warning("All fields are required");
    }

    dispatch(userLogin({ ...loginData }));
  };

  const handleInput = (name, value) => {
    if (name === "email") {
      validateEmail(value);
      value = validateEmailLowerCase(value);
    }

    setLoginData((prev) => ({ ...prev, [name]: value }));

    return value;
  };

  function validateEmail(email) {
    const emailRegex =
      /^(?=.{1,50}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    setEmailError(!emailRegex.test(email));
  }

  const commonTextFieldProps = {
    size: "small",
    sx: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#EC9324",
      },
      "& .MuiInputBase-input": {
        fontSize: "14px",
        fontWeight: "100",
      },
      "& .MuiInputLabel-root": {
        fontSize: "15px",
      },
    },
    required: true,
  };

  return (
    <Box id="container">
      <Box id="leftBox">
        <img src={home} alt="register" style={{ overflow: "hidden" }} />
      </Box>
      <Box id="rightBox">
        <Typography>Login as an expert</Typography>
        <ToastContainer />
        <form onSubmit={handleLogin}>
          <Box sx={{ width: "67%", margin: "30px auto" }}>
            <TextField
              {...commonTextFieldProps}
              label="Email ID"
              value={loginData.email}
              onChange={(e) => handleInput("email", e.target.value)}
              sx={{
                ...commonTextFieldProps.sx,
                "& .MuiInputLabel-root.Mui-focused": {
                  color: loginData.email ? "black" : "#EC9324",
                },
                width: "100%",
              }}
              error={emailError}
              helperText={
                emailError && (
                  <Box
                    sx={{ display: "flex", alignItems: "center", color: "red" }}
                  >
                    <ErrorOutlineOutlinedIcon
                      sx={{ fontSize: "15px", marginRight: "4px" }}
                    />
                    enter correct email address
                  </Box>
                )
              }
            />
          </Box>

          <Box sx={{ width: "67%", margin: "30px auto" }}>
            <TextField
              {...commonTextFieldProps}
              label="Password"
              value={loginData.password}
              onChange={(e) => handleInput("password", e.target.value)}
              sx={{
                ...commonTextFieldProps.sx,
                "& .MuiInputLabel-root.Mui-focused": {
                  color: loginData.password ? "black" : "#EC9324",
                },
                width: "100%",
              }}
            />
          </Box>
          <Box sx={{ width: "67%", margin: "20px auto" }}>
            <LoadingButton
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "#EC9324",
                color: "white",
                height: "35px",
                borderRadius: 20,
                fontSize: "14px",
                fontWeight: "400",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#EC9324",
                },
                "&.MuiLoadingButton-loading": {
                  backgroundColor: "#EC9324",
                },
                "&.MuiLoadingButton-loading .MuiCircularProgress-root": {
                  color: "white",
                },
              }}
              type="submit"
              loading={loading}
              // loadingIndicator="Loading Response..."
              disabled={emailError}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
        <Typography>
          Don't have an account ?
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            {" "}
            Sign Up
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Registration;

export const validateEmailLowerCase = (value) =>
  value.trimStart().toLowerCase().replace(" ", "");
