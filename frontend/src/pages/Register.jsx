import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper} from "@mui/material";
import {PersonAdd} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useAuth } from "auths/hooks/authHook";
import { useError } from "errors/errorHook";
import wordsUpperCase from "utilities/wordsUpperCase";
import {
  CCButtonSky,
  CCButtonGreen,
  CCTypographyH4,
  CCDividerHorizontal,
  CCAuthTextField,
  ccCommonGap,
  ccBgColor,
  ccAreaBgColor,
  ccBgVar1Color,
  ccLargeFontColor,
} from "components/mui-customizations/styleCustomization";




const Register = () => {
  // const { handleRegister } = useContext(AuthContext);
  const {handleRegister} = useAuth();
  const navigate = useNavigate();
  // const { showError } = useContext(ErrorContext);
  const {ccGetError} = useError();


  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await handleRegister(data);
  //     if(result) {
  //       Swal.fire({
  //         title: "Success!", 
  //         text: "Your are registered. Require login to access",
  //         icon: "success",
  //         iconColor: ccLargeFontColor,
  //         color: ccLargeFontColor,
  //         confirmButtonColor: ccLargeFontColor,
  //         background: ccBgVar1Color,
  //       }) 
  //       navigate("/auth/login")
  //     } else {
  //       // showError('Invalid Registration');
  //       // Swal.fire("Error", "Invalid login details", "error");
  //       // console.log('get n show', await ccGetError(result))
  //       // console.log('only message', ccShowError)
  //       // console.log('only message1', ccError)
  //       navigate("/auth/register");
  //     }
  //   } catch (error) {
  //     // showError('Invalid Registration');
  //     // Swal.fire("Error", "Registration failed", "error");
  //   }
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await handleRegister(data);
      if(result && result.data && typeof result.data.user !== 'undefined' ) {
        if (result.data.status === 'success') {
          Swal.fire({
            title: `${wordsUpperCase(result.data.status)}!`, 
            text: result.data.message, 
            icon: "success",
            iconColor: ccLargeFontColor,
            color: ccLargeFontColor,
            confirmButtonColor: ccLargeFontColor,
            background: ccBgVar1Color,
          }) 
          navigate("/auth/login")
        } else {
          navigate("/auth/register");
        }
      } else {
        await ccGetError(result)
      }
    } catch (error) {
      await ccGetError(error)
    }
  };

  const handleRedirectToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <Grid
      item
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={ccBgColor}
      xs={12}
      sm={8}
      md={6}
      lg={6}
      xl={6}
    >
      <Paper
        elevation={4}
        sx={{
          p: ccCommonGap,
          backgroundColor: ccBgVar1Color,
          width: {
            xs: "90%",
            sm: "80%",
            md: 500,
            lg: 600,
            xl: 600,
          }
        }}
      >
        <CCTypographyH4
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PersonAdd 
            fontSize="large" 
            sx={{marginRight: '5px'}}
          /> Register
        </CCTypographyH4>
        <CCDividerHorizontal />
        <form>
          <Paper 
            elevation={2}
            sx={{
              p: ccCommonGap,
              backgroundColor: ccAreaBgColor
            }}
          >
            <CCAuthTextField 
              type="text"
              name="name"
              id="name"
              label={"Name"}
              placeholder="Enter name"
              helperText="Incorrect entry."
              // error
              required
              onChange={handleChange} 
              sx={{
                marginBottom: '20px'
              }}
            />
            <CCAuthTextField
              type="text"
              name="username"
              id="username"
              label={"Username"}
              placeholder="Enter username"
              helperText="Incorrect entry."
              // error
              required
              onChange={handleChange} 
              sx={{
                marginBottom: '20px'
              }}
            />
            <CCAuthTextField
              type="email"
              name="email"
              id="email"
              label={"E-mail"}
              placeholder="Insert E-mail"
              helperText="Incorrect entry."
              // error
              required
              onChange={handleChange} 
              sx={{
                marginBottom: '20px'
              }}
            />
            <CCAuthTextField
              type="password"
              name="password"
              id="password"
              label={"Password"}
              placeholder="Enter password"
              helperText="Incorrect entry."
              autoComplete="off"
              // error
              required
              onChange={handleChange} 
              sx={{
                marginBottom: '20px'
              }}
            />
            <CCAuthTextField
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              label={"Password Confirmation"}
              placeholder="Confirm password"
              helperText="Incorrect password confirmation."
              autoComplete="off"
              // error
              required
              onChange={handleChange} 
            />
          </Paper>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ marginTop: "20px" }}
          >
            <CCButtonGreen 
              onClick={handleRedirectToLogin}
            >
              Login
            </CCButtonGreen>

            <CCButtonSky 
              onClick={handleSubmit}
            >
              Submit for Registration
            </CCButtonSky>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
