import React from "react";
import { useParams } from 'react-router-dom';
import {Box, Stack} from '@mui/material';
import { UserProvider } from "components/users/userContext";
import { RoleProvider } from "components/roles/roleContext";
import ImageUpload from "components/upload-images/imageUpload";
import CreateEditForm from "components/users/createEditForm";
import { 
  ccVar1CommonGap,
  ccVar2CommonGap,
} from "components/mui-customizations/styleCustomization"




const UserEdit = () => {
  const { id } = useParams();
  
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
      {/* upload image */}
      <ImageUpload />
      {/* End upload image */}

      {/* Create Edit Form */}
      <Box
        display="flex"
        alignSelf="stretch"
      >
        <UserProvider>
          {/* <RoleProvider> */}
            <CreateEditForm 
              option="edited" 
              id={Number(id)} 
            />
          {/* </RoleProvider> */}
        </UserProvider>
      </Box>
      {/* End Create Edit Form */}

      {/* Empty box */}
      {/* <Box
        display="flex"
        flexDirection="row"
      >
      </Box> */}
      {/* End empty box */}
    </Stack>
  );
};

export default UserEdit;
