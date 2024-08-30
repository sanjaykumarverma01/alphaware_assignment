import React, { useEffect, useState } from "react";
import home from "../../Assets/Svg/home.svg";
import { TextField, Typography, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../../Redux/auth/action";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      toast.success("Registration successful");
      navigate("/login");
    }
  }, [error, isAuthenticated]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !confirmPassword
    ) {
      return toast.warning("All fields are required");
    }
    if (registerData.password !== confirmPassword) {
      return toast.error("Password did not match");
    }

    dispatch(userSignUp({ ...registerData }));
  };

  const handleInput = (name, value) => {
    if (name === "email") {
      validateEmail(value);
      value = validateEmailLowerCase(value);
    }
    if (name === "name") {
      validateNameError(value);
      value = validateName(value);
    }

    setRegisterData((prev) => ({ ...prev, [name]: value }));

    return value;
  };

  function validateNameError(name) {
    const nameRegex = /^(?!\s)(?=.{1,60}$)[a-zA-Z\s]+$/;
    setNameError(!nameRegex.test(name));
  }
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
        <Typography>Register as an expert</Typography>
        <ToastContainer />
        <form onSubmit={handleRegister}>
          <Box sx={{ width: "67%", margin: "30px auto" }}>
            <TextField
              {...commonTextFieldProps}
              label="Name"
              value={registerData.name}
              onChange={(e) => handleInput("name", e.target.value)}
              sx={{
                ...commonTextFieldProps.sx,
                "& .MuiInputLabel-root.Mui-focused": {
                  color: registerData.name ? "black" : "#EC9324",
                },
                width: "100%",
              }}
              error={nameError}
              helperText={
                nameError && (
                  <Box
                    sx={{ display: "flex", alignItems: "center", color: "red" }}
                  >
                    <ErrorOutlineOutlinedIcon
                      sx={{ fontSize: "15px", marginRight: "4px" }}
                    />
                    enter correct name
                  </Box>
                )
              }
            />
          </Box>

          <Box sx={{ width: "67%", margin: "30px auto" }}>
            <TextField
              {...commonTextFieldProps}
              label="Email ID"
              value={registerData.email}
              onChange={(e) => handleInput("email", e.target.value)}
              sx={{
                ...commonTextFieldProps.sx,
                "& .MuiInputLabel-root.Mui-focused": {
                  color: registerData.email ? "black" : "#EC9324",
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
              value={registerData.password}
              onChange={(e) => handleInput("password", e.target.value)}
              sx={{
                ...commonTextFieldProps.sx,
                "& .MuiInputLabel-root.Mui-focused": {
                  color: registerData.password ? "black" : "#EC9324",
                },
                width: "100%",
              }}
            />
          </Box>

          <Box sx={{ width: "67%", margin: "30px auto" }}>
            <TextField
              {...commonTextFieldProps}
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                ...commonTextFieldProps.sx,
                "& .MuiInputLabel-root.Mui-focused": {
                  color: confirmPassword ? "black" : "#EC9324",
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
              disabled={nameError || emailError}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
        <Typography>
          Already have an account ?
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            {" "}
            Sign In
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Registration;

export const validateEmailLowerCase = (value) =>
  value.trimStart().toLowerCase().replace(" ", "");

export const validateName = (value) =>
  value
    .trimStart()
    .replace(/[^a-zA-Z\s]/g, "")
    .replace("  ", " ");
