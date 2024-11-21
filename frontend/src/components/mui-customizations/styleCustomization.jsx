import * as React from "react";
import { NavLink} from "react-router-dom";
import {Button,ToggleButton,Typography,TextField,Divider} from "@mui/material";
import { AppRegistration, Input } from "@mui/icons-material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";




// CC All Used Colors
const ccBgColor = '#536a8c' // Charter Blue Color, Basically main background
const ccSubBgColor = '#2f4d78' // Yale Color, Basically top bar background
const ccBgVar1Color = '#e7edf0' // Basically section background
const ccBgVar2Color = '#f2f3f5' // Basically sub section background
const ccAreaBgColor = '#dce9ff' // Creame White Color, Basically Box Area background
const ccLargeFontColor = '#009dff' // Pale Conflower Blue Color, Basically Large font color
const ccVar1Color = '#b0d7ff' // Dodger Blue Color, Basically sometimes font, large font, icons and button color
const ccVar2Color = '#008000' // Green Color, Basically sometimes font, large font, icons and button color
const ccVar3Color = '#8394ad' // Shadow Blue, Basically small font, icons, buttons etc.
const ccVar4Color = '#7fafcc' // Particularly to use inside content and menu bar etc.
const ccVar5Color = "#ff3c3c" // Redish color, basically for border.
const ccVar6Color = "#fffe00" // Yellowsh color, basically for alert title.
const ccVar7Color = "#9c27b0" // Purpelish + pinkish (MUI secondary color) basically error and error border.
// End CC All Used Colors




// CC All Commpon Gap
const ccCommonGap = 3
const ccVar1CommonGap = 1
const ccVar2CommonGap = 2
const ccVar3CommonGap = 4
// End CC All Common Gap




// CC MUI Typography
const CCTypographyH4 = (props) => {
  return (
    <Typography
      variant="h4"
      {...props}
      sx={{
        fontWeight: 700,
        color: ccLargeFontColor,
        ...props.sx
      }}
    >
      {props.children}
    </Typography>
  );
};
// End CC MUI Typography




// EC MUI TextField
const ccAuthTextFieldStyle = (props) => {
  return {
    fieldset: {
      borderColor: ccVar2Color+"!important",
      color: ccVar2Color+"important",
    },
    label: {
      color: ccVar2Color,
      "&:hover": {
        color: ccLargeFontColor+"!important",
      },
    },
    ...props.sx,
  }
};
const CCAuthTextField = ({endAdornment, ...props}) => {
  return (
    <TextField
      size="small"
      fullWidth
      InputProps={{
        ...props.InputProps,
        endAdornment: endAdornment,
      }}
      onChange={props.onChange}
      {...props}
      sx={ccAuthTextFieldStyle(props)}
    >
      {props.children}
    </TextField>
  );
};
// End CC MUI TextField




// CC MUI Button
const ccButtonStyleSky = (props) => {
  return {
    bgcolor: ccLargeFontColor,
    ":hover": {
      backgroundColor: ccBgColor,
    },
    marginLeft: "16px",
    ...props.sx,
  }
};
const ccButtonStyleGreen = {
  bgcolor: ccVar2Color,
  ":hover": {
    backgroundColor: ccBgColor,
  },
  marginLeft: "16px",
};
const ccSmallButtonStyleGreen = {
  bgcolor: ccVar2Color,
  ":hover": {
    backgroundColor: ccBgColor,
  },
  marginLeft: "16px",
};
const CCButtonSky = (props) => {
  return (
    <Button
      variant="contained"
      endIcon={<AppRegistration />}
      {...props}
      sx={ccButtonStyleSky(props)}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};
const CCButtonGreen = (props) => {
  return (
    <Button
      variant="contained"
      endIcon={<Input />}
      sx={ccButtonStyleGreen}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </Button>
  );
};
const CCSmallButtonGreen = ({sx, ...props}) => {
  return (
    <Button
      size="small"
      variant="contained"
      endIcon={<Input />}
      sx={{
        ...ccSmallButtonStyleGreen, 
        ...sx
      }}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </Button>
  );
};
// End CC MUI Button




const CCToggleJustify = (props) => {
  return (
    <ToggleButton
      sx={{
        width: props.width,
        height: props.height,
        color: "#b0d7ff",
        borderColor: "#b0d7ff",
        ":hover": {
          backgroundColor: "#536a8c",
        },
      }}
      value="justify"
      aria-label="justified"
      onClick={props.onClick}
    >
      <FormatAlignJustifyIcon />
    </ToggleButton>
  );
};




const CCRouterNavLink = (props) => {
  return (
    <NavLink 
      to={`/`}
      style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "white" : isTransitioning ? ccVar5Color : ccLargeFontColor,
          textDecoration: 'none',
          ...props.style,
        };
      }}
      {...props}
    >
      {props.children}
    </NavLink>
  );
};




// CC MUI Divider
const CCDividerHorizontal = (props) => {
  return (
    <Divider
      orientation="horizontal"
      {...props}
      sx={{
        height: '1px',
        paddingTop: '0px!important',
        pb: {
          xs: `${ccVar2CommonGap*8}px!important`,
          sm: `${ccVar2CommonGap*8}px!important`,
          md: `${ccCommonGap*8}px!important`,
          lg: `${ccCommonGap*8}px!important`,
          xl: `${ccCommonGap*8}px!important`,
        },
        marginTop: '0px!important',
        mb: {
          xs: `${ccVar2CommonGap*8}px!important`,
          sm: `${ccVar2CommonGap*8}px!important`,
          md: `${ccCommonGap*8}px!important`,
          lg: `${ccCommonGap*8}px!important`,
          xl: `${ccCommonGap*8}px!important`,
        },
        borderBottom: "1px",
        borderBottomStyle: 'solid',
        borderBottomColor: ccVar2Color+'30',
        ...props.sx,
      }}
    />
  );
};
const CCDividerVertical = (props) => {
  return (
    <Divider
      orientation="vertical"
      variant="middle"
      flexItem={true} // If true will correct height when used inside flex container
      {...props}
      sx={{
        paddingRight: "8px",
        borderRight: "1px",
        borderStyle: "solid",
        borderColor: ccVar1Color,
        marginRight: "8px",
        ...props.sx,
      }}
    />
  );
};
// End CC MUI Divider





// CC MUI Paper
// const CCPaper = styled(Paper)(({ theme }) => ({
//   ...theme,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
// const CCPaperWithoutBottomPadding = styled(Paper)(({ theme }) => ({
//   ...theme,
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#dce9ff",
//   padding: "20px 20px 0 20px",
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// const CCPaperHeaderWrapper = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#b0d7ff",
//   ...theme.typography.body2,
//   borderRadius: 0,
// }));

// const CCPaperHeaderTop = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#2f4d78",
//   ...theme.typography.body2,
//   textAlign: "center",
//   color: "#b0d7ff",
//   borderRadius: 0,
// }));

// const CCPaperHeaderBottom = styled(Paper)(({ theme }) => ({
//   backgroundColor: "transparent",
//   ...theme.typography.body2,
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   borderRadius: 0,
// }));
// End CC MUI Paper




export {
  CCTypographyH4,
  CCAuthTextField,
  CCButtonSky,
  CCButtonGreen,
  CCSmallButtonGreen,
  CCToggleJustify,
  CCRouterNavLink,
  CCDividerHorizontal,
  CCDividerVertical,
  ccBgColor,
  ccSubBgColor,
  ccBgVar1Color,
  ccBgVar2Color,
  ccAreaBgColor,
  ccLargeFontColor,
  ccVar1Color,
  ccVar2Color,
  ccVar3Color,
  ccVar4Color,
  ccVar5Color,
  ccVar6Color,
  ccVar7Color,
  ccCommonGap,
  ccVar1CommonGap,
  ccVar2CommonGap,
  ccVar3CommonGap,
};
