import React, {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";

import { Settings, PersonAdd, Logout} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import {
  Box,
  Stack,
  AppBar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Button,
  Toolbar,
  Badge,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import {
  CCDividerHorizontal,
  CCRouterNavLink,
  ccVar1Color,
  ccBgVar1Color,
  ccBgColor,
  ccVar2CommonGap,
  ccCommonGap,
  ccLargeFontColor,
  ccVar4Color,
} from "components/mui-customizations/styleCustomization";

import { useAuth } from "auths/hooks/authHook";
import { useRole, useRoleDispatch } from "components/roles/roleContext";
import { useMessage } from "messages/messageContext";
import { useError } from "errors/errorHook";
import CCLogo, { CCLogoTypography } from "components/layouts/logo"; 


const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

//Vite way to get asset image
const logoExists = new URL('../../assets/images/crystalcodelogo.png', import.meta.url).href;

const ApplicationBar = () => {
  const navigate = useNavigate();
  const { isProfile, profile, fetchProfile, handleLogout } = useAuth();
  const { role, allPagingRoles, fetchAllRoles } = useRole();
  const roleDispatch = useRoleDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);

    // Fresh data reload while in profile/user edit or account settings
    // Fresh data reload while in role edit
    await fetchProfile(); 
    await fetchAllRoles();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Error context errors to display 
  const {ccGetError} = useError();
  const {message, messageDispatch} = useMessage();

  const handleLogoutClick = async () => {
    setAnchorEl(null);
    const response = await handleLogout();

    // Message display after successful logged out through message context
    if (response.status === 'success') {
      await messageDispatch(response.status, response.message);

      // After login navigate to
      navigate("/auth/login");
    } else {
      await ccGetError(response);
    }
  };
  
  // useEffect(() => {
  //   const roleData = allPagingRoles ? allPagingRoles.find(r => r.id === role.id) : null;
  //   roleDispatch({
  //     type: 'set',
  //     role: {
  //       ...role,
  //       ...roleData,
  //     }
  //   })
  // }, [allPagingRoles])

  return (
    <AppBar 
      position="static"
      sx={{
        backgroundColor: ccBgColor,
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Box
        px={{
          xs: ccVar2CommonGap,
          sm: ccCommonGap,
          md: ccCommonGap,
          lg: ccCommonGap,
          xl: ccCommonGap,
        }}
      >
        <Toolbar 
          disableGutters
        >
          {/* Logo */}
          <CCRouterNavLink
            to={`/`}
          >
            {
              typeof logoExists !== 'undefined' && logoExists ? (
                <CCLogo
                  src={logoExists}
                  style={{
                    padding: '10px 10px 10px 0'
                  }}
                />
              ) : (
                <CCLogoTypography 
                  variant="h6"
                >
                  L O G O
                </CCLogoTypography>
              )
            }
          </CCRouterNavLink>
          {/* End Logo */}
          
          {/* Menu in small device breakpoints */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: { 
                xs: "flex", 
                md: "none" } 
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { 
                  xs: "block", 
                  md: "none" 
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page} 
                  onClick={handleCloseNavMenu}
                >
                  <Typography 
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* End menu in small device breakpoints */}

          {/* Extra icon in small device breakpoints */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          {/* End extra icon in small device breakpoints */}

          {/* Extra text in small device breakpoints */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {/* End extra text in small device breakpoints */}

          {/* Menu in large device breakpoints */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: { 
                xs: "none", 
                md: "flex" 
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: ccVar1Color, 
                  display: "block" 
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* End menu in large device breakpoints */}

          {/* Mails notifications and Profile accounts */}
          <Box 
            sx={{ 
              flexGrow: 0,
              color: ccVar1Color,
            }}
          >
            {/* Mails and notifications */}
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge 
                badgeContent={4} 
                color="error"
              >
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge 
                badgeContent={17} 
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* End mail and notifications */}

            {
              // Another Style of Account Settings
              /* <Tooltip 
                title="Open settings"
              >
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ 
                    p: 0, 
                    ml: 2,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      height:"30px",
                      width:"30px",
                      backgroundColor: ccVar1Color,
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ 
                  mt: "45px" 
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting} 
                    onClick={handleCloseUserMenu}
                  >
                    <Typography 
                      textAlign="center"
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu> */
            }

            {/* Profile accounts */}

              <Tooltip 
                title="Account settings"
              >
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 1, p: 0 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    bgcolor: ccBgVar1Color,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: ccBgVar1Color,
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <PersonOutlinedIcon fontSize="small" /> 
                  </ListItemIcon>
                  {`Welcome! ${profile ? profile.name : ''}`}
                </MenuItem>
                <MenuItem sx={{color: ccVar4Color}}>
                  <ListItemIcon>
                    <ManageAccountsTwoToneIcon sx={{color: ccLargeFontColor}} fontSize="small" /> 
                  </ListItemIcon>
                  <Typography variant="subtitle2">
                    Role: {profile?.roles?.map(role => role.title).join(', ')}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <CCDividerHorizontal 
                  sx={{
                    pb: '8px',
                    mb: '8px!important',
                  }}
                />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>

            {/* End profile accounts */}

          </Box>
          {/* End profile accounts */}
          
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default ApplicationBar