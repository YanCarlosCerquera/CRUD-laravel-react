import * as React from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Container, Grid, CssBaseline} from "@mui/material";
import { ccBgColor} from "components/mui-customizations/styleCustomization";
import CCMuiSnackBar from "components/mui-customizations/ccMuiSnackBar";

import Content from "components/layouts/content";


const AuthLayout = () => {

  return (
    <>
      <CssBaseline />
      <Container 
        disableGutters 
        maxWidth="false"
      >
        <Grid
          container
          minHeight="100vh"
          bgcolor={ccBgColor}
        >
          <Grid
            item
            container
            direction="column"
            justifyContent='center'
            alignItems='center'
          >
            <Content />
          </Grid>
        </Grid>
      </Container>
      <CCMuiSnackBar />
    </>
  );
};

export default AuthLayout;
