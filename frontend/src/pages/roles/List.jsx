import React from "react";
import { Box, Stack } from "@mui/material";
import { RoleProvider } from "components/roles/roleContext";
import RoleList from "components/roles/roleList";
import { 
  ccVar1CommonGap,
  ccVar2CommonGap,
} from 'components/mui-customizations/styleCustomization';




const List = () => {
  return (
    <Stack 
      direction="column" 
      justifyContent="flex-start" 
      alignItems="flex-start" 
      spacing={{
        xs: ccVar1CommonGap,
        sm: ccVar1CommonGap,
        md: ccVar2CommonGap,
        xl: ccVar2CommonGap,
        lg: ccVar2CommonGap,
      }}
    >
      <Box
        display="flex"
        alignSelf="stretch"
      >
        {/* <RoleProvider> */}
          <RoleList />
        {/* </RoleProvider> */}
      </Box>
    </Stack>
  );
};

export default List;
