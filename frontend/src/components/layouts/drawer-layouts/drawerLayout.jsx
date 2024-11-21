import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from 'auths/hooks/authHook';
import Content from 'components/layouts/content';
import Footer from 'components/layouts/footer';
import Header from 'components/layouts/header';
import Menu from "components/layouts/menu"
import {
  Grid,
  Box,
  Drawer,
  Typography,
  IconButton,
  CssBaseline,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import {
  ccBgColor,
  ccBgVar1Color,
  ccAreaBgColor,
  ccCommonGap,
  ccVar2CommonGap,
  ccVar3CommonGap,
} from "components/mui-customizations/styleCustomization";


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(12.5, 0, 2, 0),
    // padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DrawerLayout = () => {
  const {isProfile, profileLoading} = useAuth()
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <Container
        disableGutters
        maxWidth="false"
      > */}
        <Grid
          container
          minHeight="100vh"
          bgcolor={ccBgColor}
        >
          {/* Header and drawer menu */}
          {isProfile && (
            <>
              {/* Header */}
              <AppBar 
                position="fixed" 
                open={open} 
                sx={{
                  bgcolor:'transparent', boxShadow:"unset",

                }}
              >
                <Header>
                  <Toolbar sx={{flexGrow:1, paddingLeft:"12px!important"}}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                      {/* Persistent drawer */}
                    </Typography>
                  </Toolbar>
                </Header>
              </AppBar>
              {/* End header */}

              {/* The Drawer and Menu */}
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: ccBgVar1Color,
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader
                  sx={{
                    minHeight: "0px!important"
                  }}
                >
                  <IconButton 
                    onClick={handleDrawerClose}
                    sx={{
                      py:0.3
                    }}
                  >
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </DrawerHeader>

                {/* <CCDividerHorizontal
                  sx={{
                    mb: 'opx',
                    pb: 4
                  }}
                /> */}
                <Menu />
              </Drawer>
              {/* End the drawer and menu */}
            </>
          )}
          {/* End header and drawer menu */}
          
          {/* Content */}
          <Main open={open}>
            <DrawerHeader />
            <Grid
              container
              spacing={{
                xs: ccCommonGap,
                sm: ccCommonGap,
                md: ccCommonGap,
                xl: ccCommonGap,
                lg: ccCommonGap,
              }}
            >
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
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Content />
                </Grid>
              </Grid>
            </Grid>
          </Main>
          {/* Content */}

          {/* Footer content */}
          {isProfile && (
            <AppBar 
              position="fixed" 
              open={open} 
              sx={{
                alignItems:'center'
              }}
            >
              <Footer />
            </AppBar>
          )}
          {/* End footer content */}
        </Grid>
      {/* </Container> */}
      </Box>
    </>
  );
}

export default DrawerLayout;