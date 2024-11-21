import {Grid, Box, Paper, Typography} from "@mui/material"; // Grid version 1
// import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {ccSubBgColor,ccVar3Color} from "components/mui-customizations/styleCustomization";




const Footer = () => {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          textAlign: 'center',
          width: "100%",
        }}
      >
        <Paper
          sx={{
            background: ccSubBgColor,
            width: '100%',
            color: ccVar3Color,
            borderRadius:0
          }}
        >
          <Typography 
            variant="caption" 
          >
            &copy; Copy right @ <strong>Crystal Code</strong>. All rights reserved <strong>2024</strong>.
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Footer;
