import * as React from "react";
import { styled, alpha } from '@mui/material/styles';
import { Settings} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import ApplicationBar from "components/layouts/applicationBar";
import {
  Grid,
  Box,
  Paper,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  CCDividerVertical,
  ccVar1Color,
  ccSubBgColor,
  ccCommonGap,
  ccVar2CommonGap,
} from "components/mui-customizations/styleCustomization";
import { RoleProvider } from "components/roles/roleContext";




// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.65),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '5px 8px 5px 0',
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Header = (props) => {
  return (
    <>
      <Paper 
        elevation={3}
        sx={{
          backgroundColor: ccVar1Color,
          borderRadius: 0,
        }}
      >
        {/* Top Bar */}
        <Paper 
          elevation={0}
          sx={{
            color: ccVar1Color,
            backgroundColor: ccSubBgColor,
            borderRadius: 0
          }}
        >
          <Box 
            px={{
              xs: ccVar2CommonGap,
              sm: ccCommonGap,
              md: ccCommonGap,
              xl: ccCommonGap,
              lg: ccCommonGap,
            }}
          > 
            <Box 
              display="flex" 
              direction="row" 
              justifyContent="flex-end" 
              alignItems="center" 
              py={0.3}
            >
              <IconButton
                size="small"
                sx={{
                  p:0,
                  '& svg': {
                    color: ccVar1Color,
                    transition: '0.2s',
                    transform: 'translateX(0) rotate(0)',
                  },
                  '&:hover, &:focus': {
                    bgcolor: 'unset',
                    '& svg:last-of-type': {
                      right: 0,
                      opacity: 1,
                    },
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    height: '80%',
                    display: 'block',
                    left: 0,
                    width: '1px',
                    bgcolor: 'unset',
                  },
                }}
              >
                <Settings sx={{width: '20px'}} />
              </IconButton>
              {/* <Settings sx={{width: '20px'}} /> */}
              <CCDividerVertical
                flexItem={true}
                sx={{
                  marginTop: '5px',
                  marginBottom: '5px',
                }}
              />
              <Typography 
                variant="error" 
                m={0}
              >
                Login
              </Typography>
            </Box>
          </Box>
        </Paper>
        {/* End Top Bar */}

        {/* Bottom Bar */}
        <Paper 
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            borderRadius: 0,
          }}
        >
          {/* Bottom Top Bar */}
          {/* <RoleProvider> */}
          <ApplicationBar />
          {/* </RoleProvider> */}
          {/* End Bottom Top Bar */}

          {/* Bottom Bottom Bar */}
          <Grid
            container
            px={{
              xs: ccVar2CommonGap,
              sm: ccCommonGap,
              md: ccCommonGap,
              xl: ccCommonGap,
              lg: ccCommonGap,
            }}
            py={0.25}
          >
            <Grid 
              item 
              xs={12} 
              sm={12} 
              md={12} 
              lg={12} 
              xl={12}
            >
              <Box 
                display="flex" 
                flexDirection="row" 
                justifyContent="flex-end" 
                alignItems="center" 
                height="40px"
              >
                {props.children}
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    id="search"
                    placeholder="Search…"
                    inputProps={{ 
                      'aria-label': 'search' 
                    }}
                  />
                </Search>
              </Box>
            </Grid>
          </Grid>
          {/* End Bottom Bottom Bar */}
        </Paper>
        {/* End Bottom Bar */}
      </Paper>
    </>
  );
};

export default Header;
