import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper} from "@mui/material";
import {Login as LoginIcon} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useAuth } from "auths/hooks/authHook";
import { useError } from "errors/errorHook";
import wordsUpperCase from "utilities/wordsUpperCase";
import { 
  swalLoginRegisterAlert 
} from "components/swal-customizations/styleCustomization";
import {
  CCTypographyH4,
  CCDividerHorizontal,
  CCAuthTextField,
  CCButtonSky,
  CCButtonGreen,
  ccCommonGap,
  ccBgColor,
  ccAreaBgColor,
  ccBgVar1Color,
  ccVar2Color,
} from "components/mui-customizations/styleCustomization"




const Login = () => {
  // const { handleLogin } = useContext(AuthContext);
  const {isProfile, handleLogin} = useAuth();
  const navigate = useNavigate();

  const {ccGetError} = useError();
  // const [credentials, setCredentials] = useState({
  //   email: "",
  //   password: "",
  // });

  const [credentials, setCredentials] = useState({
    email_or_username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await handleLogin(credentials);
  //     if(result) {
  //       swalLoginRegisterAlert.fire({
  //         title: "Success!", 
  //         text: "Your are logged in", 
  //         icon: "success",
  //         iconColor: ccVar2Color,
  //         color: ccVar2Color,
  //         confirmButtonColor: ccVar2Color,
  //         background: ccBgVar1Color,
  //       }) 
  //       navigate("/dashboard")
  //     } else {
  //       navigate("/auth/login")
  //     }
  //   } catch (error) {
  //     // alert()
  //     // Swal.fire("Error", "Invalid login details", "error");
  //   }
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await handleLogin(credentials);
      if (result && result.data && typeof result.data.status !== 'undefined') {
        if (result.data.status === 'success') {
          swalLoginRegisterAlert.fire({
            title: `${wordsUpperCase(result.data.status)}!`, 
            text: result.data.message, 
            icon: "success",
            iconColor: ccVar2Color,
            color: ccVar2Color,
            confirmButtonColor: ccVar2Color,
            background: ccBgVar1Color,
          }) 
          navigate("/dashboard")
        } else {
          navigate("/auth/login")
        }
      } else {
        await ccGetError(result)
      }
    } catch (error) {
      await ccGetError(error)
    }
  };

  const handleRedirectToRegistration = () => {
    navigate("/auth/register");
  };

  return (
    <>
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
            <LoginIcon 
              fontSize="large" 
              sx={{marginRight: '5px'}}
            /> Iniciar sesión
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
                name="email_or_username"
                id="email_or_username"
                label={"Ingrese correo electronico o nombre de usuario"}
                placeholder="Ingrese correo electronico o nombre de usuario"
                helperText="Entrada incorrecta."
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
                label={"Contraseña"}
                placeholder="Enter password"
                helperText="Entrada incorrecta."
                autoComplete="off"
                // error
                required
                onChange={handleChange}
              />
            </Paper>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ 
                marginTop: "20px" 
              }}
            >
              <CCButtonSky 
                onClick={handleRedirectToRegistration}
              >
                Registrar ahora
              </CCButtonSky>

              <CCButtonGreen 
                onClick={handleSubmit}
              >
                Iniciar
              </CCButtonGreen>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
