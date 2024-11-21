import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Box, Drawer, IconButton, Typography} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Menu from "components/layouts/menu";
import { 
  CCDividerHorizontal, 
  ccBgVar1Color
} from "components/mui-customizations/styleCustomization";




const drawerWidth = 210;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DefaultSidebar = () => {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };
  
  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        // borderRadius={2}
        // bgcolor={ccBgVar1Color}
        // sx={{
        //   height: '100%'
        // }}
      >
        <Box
          flexGrow={1}
          // mb={ccVar3CommonGap}
        >
          <Drawer
            sx={{
              width: 'unset',
              height: '100%',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 'unset',
                boxSizing: 'border-box',
                position: 'unset',
                bgcolor: ccBgVar1Color,
                borderRadius: 2,
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader
              sx={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'flex-start',
                alignItems:'flex-end',
                minHeight: '48px!important',
              }}
            >
              <IconButton 
                // onClick={handleDrawerClose}
                sx={{
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <FormatListBulletedIcon /> 
                <Typography 
                  variant='h6'
                  pl={1}
                >
                  Default Sidebar Menu
                </Typography> 
              </IconButton>
            </DrawerHeader>

            <CCDividerHorizontal
              sx={{
                mb: 'opx',
              }}
            />
            <Menu />
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default DefaultSidebar;
