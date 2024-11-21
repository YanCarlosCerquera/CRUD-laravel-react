import * as React from "react";
import DefaultSidebar from "components/layouts/default-layouts/defaultSidebar";
import Content from "components/layouts/content";
import Footer from "components/layouts/footer";
import Header from "components/layouts/header";
import { useAuth } from "auths/hooks/authHook";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Container, 
  Grid, 
  Box, 
  CssBaseline, 
  CircularProgress,
} from "@mui/material";
import { 
  ccCommonGap,
  ccVar2CommonGap,
  ccVar3CommonGap,
  ccBgColor,
  ccAreaBgColor 
} from "components/mui-customizations/styleCustomization";




const DefaultLayout = () => {
  const {isProfile, profileLoading} = useAuth();

  if (profileLoading) {
    return (
      <>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor={ccBgColor}
      >
        <CircularProgress sx={{ color: ccAreaBgColor }} />
      </Box>
      </>
    );
  }
  
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
          {/* Header, Sidebar and Content, Footer */}
          <Grid
            item
            container
            direction='row'
            alignContent='flex-start'
            spacing={{
              xs: ccCommonGap,
              sm: ccCommonGap,
              md: ccCommonGap,
              xl: ccCommonGap,
              lg: ccCommonGap,
            }}
          >
            {/* Header */}
            {isProfile && (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <Header />
              </Grid>
            )}
            {/* End header */}

            {/* Sidebar and Content */}
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              mb={ccVar3CommonGap}
            >
              {/* Sidebar */}
              {isProfile && (
                <Grid
                  item
                  pl={{ 
                    xs:0, 
                    sm: 0, 
                    md: ccCommonGap, 
                    lg: ccCommonGap, 
                    xl: ccCommonGap,
                  }}
                  xs={12}
                  sm={12}
                  md={3.5}
                  lg={3.5}
                  xl={2.5}
                >
                  <DefaultSidebar />
                </Grid>
              )}
              {/* End sidebar */}

              {/* Content */}
              <Grid
                item
                pr={{ 
                  xs:ccVar2CommonGap,
                  sm: ccCommonGap, 
                  md: ccCommonGap, 
                  lg: ccCommonGap, 
                  xl: ccCommonGap,
                }}
                pl={{
                  xs:ccVar2CommonGap,
                  sm: ccCommonGap,
                }}
                xs={12}
                sm={12}
                md={8.5}
                lg={8.5}
                xl={9.5}
              >
                <Content />
              </Grid>
              {/* End Content */}
            </Grid>
            {/* End sidebar and content */}

            {/* Footer */}
            {isProfile && (
              <Grid
                item
                xs
              >
                <Footer />
              </Grid>
            )}
            {/* End footer */}
          </Grid>
          {/* End Header, Sidebar and Content, Footer */}
        </Grid>
      </Container>
    </>
  );
};

export default DefaultLayout;
