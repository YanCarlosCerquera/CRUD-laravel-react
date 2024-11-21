import React from "react";
import { useNavigate } from "react-router-dom";
import {Box, Avatar, Button, Typography} from '@mui/material';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useAuth } from "auths/hooks/authHook";
import profileImage from "static/images/profile-image.png"
import { 
  ccBgColor,
  ccVar4Color,
  ccVar5Color,
  ccVar7Color,
} from "components/mui-customizations/styleCustomization";





const ImageUpload = () => {
  const { profile } = useAuth();

  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      pb={2}
    >
      <Avatar
        variant="rounded"
        alt="Crystal Code" // If no image first letter of alt text
        src={profileImage}
        // sx={{ width: 96, height: 96,  bgcolor: deepOrange[500]}}
        sx={{ width: 152, height: 152,  bgcolor: ccVar4Color}}
      />
      <Box
        display="flex"
        flexDirection="column"
        sx={{pl:2}}
      >
        <Box>
          <Button 
            size="small"
            variant="contained"
            startIcon={<CloudUploadTwoToneIcon />}
            sx={{
              px: 1,
              bgcolor:ccVar4Color, 
              color: 'white',
              ":hover": {
                backgroundColor: ccBgColor,
              },
            }}
          >
            Upload Image
          </Button>
          <Button 
            size="small"
            variant="contained"
            startIcon={<CancelOutlinedIcon />}
            sx={{
              px: 1,
              ml: 2,
              bgcolor:ccVar7Color, 
              color: 'white',
              ":hover": {
                color: 'white',
                backgroundColor: ccBgColor,
              },
            }}
          >
            Cancle
          </Button>
        </Box>
        <Typography 
          variant="caption"
          sx={{mt:1}}
        >
          Max size of 100K
        </Typography>
      </Box>
    </Box>
  );
}
export default ImageUpload;
