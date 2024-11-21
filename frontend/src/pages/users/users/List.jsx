import React from "react";
import { Box, Stack } from "@mui/material";

import { 
  ccVar1CommonGap,
  ccVar2CommonGap,
} from 'components/mui-customizations/styleCustomization';

import { UserProvider } from "components/users/userContext";
import UserList from "components/users/userList";


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
        <UserProvider>
          {/* <RoleProvider> */}
            <UserList />
          {/* </RoleProvider> */}
        </UserProvider>
      </Box>
    </Stack>
  );
};

export default List;
