import React, {useState, useEffect} from "react";
import {Box, Stack} from '@mui/material';
import { useAuth } from "auths/hooks/authHook";
import { UserProvider } from "components/users/userContext";

import ImageUpload from "components/upload-images/imageUpload";
import CreateEditForm from "components/users/createEditForm";
import { 
  ccVar1CommonGap,
  ccVar2CommonGap,
} from "components/mui-customizations/styleCustomization"




const ProfileEdit = () => {
  // const { handleGetProfile, profile } = useAuth();
  const { profile } = useAuth();

  // useEffect(() => {
  //   fetchProfile();
  // }, [])

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
              id={Number(profile.id)}
              // profileData={profile} 
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

export default ProfileEdit;
