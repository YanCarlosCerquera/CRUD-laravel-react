import * as React from "react";
import {Typography} from "@mui/material";
import { ccVar1Color } from "components/mui-customizations/styleCustomization";




// CC Logo
const CCLogo = (props) => {
  // Vite way to get asset image
  // const checkLogoExists = new URL('../../assets/images/crystalcodelogo.png', import.meta.url).href;
  return (
    <img
      src={props.src}
      alt= "logo"
      title= "Logo Title"
      height= "60px"
      width= "inherit"
      {...props}
      style={{
        display: 'block',
        padding: "10px",
        margin: 0,
        ...props.style,
      }}
    />
  )
}

const CCLogoTypography = (props) => {
  return (
    <Typography
      variant="h6"
      noWrap
      color={ccVar1Color}
      {...props}
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        textDecoration: "none",
        ...props.sx
      }}
    >
      {props.children}
    </Typography>
  )
}
// End CC Logo

export default CCLogo;
export {CCLogoTypography}