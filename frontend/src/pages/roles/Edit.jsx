import React from "react";
import { useParams } from 'react-router-dom';
import {Box, Stack} from '@mui/material';
import { RoleProvider } from "components/roles/roleContext";
import CreateEditForm from "components/roles/createEditForm";
import { 
  ccVar1CommonGap,
  ccVar2CommonGap,
} from "components/mui-customizations/styleCustomization"




const RoleEdit = () => {
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
      {/* Create Edit Form */}
      <Box
        display="flex"
        alignSelf="stretch"
      >
        {/* <RoleProvider> */}
          <CreateEditForm 
            option="edited" 
            id={Number(id)} 
          />
        {/* </RoleProvider> */}
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

export default RoleEdit;
