import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {Box, Paper, Button, CircularProgress} from "@mui/material"; // Add CircularProgress for loading indicator
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { 
  ccBgColor,
  ccAreaBgColor,
  ccBgVar1Color,
  ccCommonGap,
  ccVar2CommonGap,
  CCDividerHorizontal,
  ccLargeFontColor,
  ccVar2Color,
} from "components/mui-customizations/styleCustomization";

import { useAuth } from "auths/hooks/authHook";
import AuthRouterService from "router/services/authRouterService";
import CCBreadcrumbs from "components/layouts/breadcrumb";
import useCurrentPages from "components/layouts/hooks/currentPagesHook";




// const useContentLoader = async () => {
//   const { isProfile } = useAuth();
//   const isProfileLoader = isProfile;
//   return {isProfileLoader};
// }

const Content = () => {
  // const isProfileLoader = useLoaderData(); // Loader data provided from router
  const { isProfile, profileLoading } = useAuth();
  // const { isProfile } = useAuth();
  const location = useLocation();
  const { currentIndivPages, currentLastPage, currentFirstPath, currentLastPath} = useCurrentPages();

  React.useEffect(() => {
    // Perform any action needed when currentLastPath changes
    // console.log(`Current last path has changed: ${currentLastPath}`);
  }, [currentLastPath]);

  const navigate = useNavigate();
  const onCreateLink = () => {
    const linkToCreateUrl = 
    currentIndivPages
    .split(',')
    .map(p=> p==='list'?'create':p)
    .join('/')
    navigate(`/${linkToCreateUrl}`)
  }
  const onListLink = () => {
    const linkToCreateUrl = 
    currentIndivPages
    .split(',')
    .map(p=> p==='create'?'list':p)
    .join('/')
    navigate(`/${linkToCreateUrl}`)
  }
  const onFromEditToListLink = () => {
    const linkToCreateUrl = currentFirstPath+'/list'
    navigate(`/${linkToCreateUrl}`)
  }

  if (profileLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress sx={{ color: '#dce9ff' }} />
      </Box>
    );
  }

  const nonAuthOutlet = (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      p={{
        xs: ccVar2CommonGap,
        sm: ccCommonGap,
        md: ccCommonGap,
        xl: ccCommonGap,
        lg: ccCommonGap,
      }}
      borderRadius={2}
      bgcolor={ccBgVar1Color}
    >
      {/* Bread crumbs and create, list link */}
      <Box 
        display="flex" 
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <CCBreadcrumbs />
        
        { currentLastPage === 'list' &&
          <Button
            variant="contained"
            color="secondary"
            startIcon={currentFirstPath === 'user' ? <PersonAddOutlinedIcon /> : <PlaylistAddOutlinedIcon /> }
            onClick={onCreateLink}
            sx={{
              color: 'white',
              backgroundColor: ccLargeFontColor,
              ":hover": {
                backgroundColor: ccBgColor,
              },
            }}
          >
            Create New {currentFirstPath}
          </Button>
        }

        { currentLastPage === 'create'  &&
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ListAltOutlinedIcon />}
            onClick={onListLink}
            sx={{
              color: 'white',
              backgroundColor: ccVar2Color,
              ":hover": {
                backgroundColor: ccBgColor,
              },
            }}
          >
            View {currentFirstPath} List
          </Button>
        }

        { /\/edit\//.test(currentLastPath)  &&
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ListAltOutlinedIcon />}
            onClick={onFromEditToListLink}
            sx={{
              color: 'white',
              backgroundColor: ccVar2Color,
              ":hover": {
                backgroundColor: ccBgColor,
              },
            }}
          >
            View {currentFirstPath} List
          </Button>
        }
      </Box>
      {/* End bread crumbs and create, list link */}

      <CCDividerHorizontal />
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          backgroundColor: ccAreaBgColor,
          p: {
            xs: ccVar2CommonGap,
            sm: ccCommonGap,
            md: ccCommonGap,
            xl: ccCommonGap,
            lg: ccCommonGap,
          },
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );

  const authOutlet = <Outlet />;

  return (
    <AuthRouterService 
      authOutlet={authOutlet} 
      nonAuthOutlet={nonAuthOutlet}
    />
  )
};

export default Content;
// export {loader};
