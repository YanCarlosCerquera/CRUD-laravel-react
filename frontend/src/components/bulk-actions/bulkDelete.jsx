import React, {useEffect} from "react";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import { 
  ccBgColor,
  ccVar7Color,
  CCSmallButtonGreen,
  ccVar2Color,
  ccBgVar1Color,
  ccLargeFontColor,
} from 'components/mui-customizations/styleCustomization';

import { 
  swalLoginRegisterAlert 
} from "components/swal-customizations/styleCustomization";

import { useRole } from "components/roles/roleContext";
import { useError } from "errors/errorHook";
import axiosInstance from "plugins/axiosInstance";
import wordsUpperCase from "utilities/wordsUpperCase";

const BulkDelete = ({
  setBulkSelectedIds,
  bulkSelectedIds,
  apiResource,
  apiRelationMethod,
  apiRelationAction,
  afterDeleteRefreshTo,
}) => {

  const {allRoles} = useRole();
  const { ccGetError } = useError();

  useEffect(() => {
    //
  }, [allRoles])

  const handleBulkDelete = async () => {
    try {
      swalLoginRegisterAlert.fire({
        title: 'Are you sure?', 
        text: "You won't be able to revert this!", 
        confirmButtonText: "Yes, delete it!",
        icon: "warning",
        showCancelButton: true,
        color: ccVar7Color,
        confirmButtonColor: ccVar2Color,
        cancelButtonColor: ccVar7Color,
        background: ccBgVar1Color,
      }).then(async result => {
        if (result.isConfirmed) {
          // Promise.all(...) Sends all the requests to the backend simultaneously.
          // The backend 'delete' resource controller method receives each DELETE request individually
          // Even though Promise.all(...) sent simultaneously.
          // await Promise.all(selectedIds.map((id) => axiosInstance.delete(`/users/${id}`)));

          // Send a single delete request with an array of selected IDs using backend bulk action API.
          // Post method used here for delete to send req with body params purposes.
          const result = await axiosInstance.post(`/${apiResource}/${apiRelationAction}/bulkDelete`, { 
            ids: bulkSelectedIds,
            relationMethod: apiRelationMethod,
          } );
          if(result.data.status === "success" ) {
            setBulkSelectedIds([]);
            await afterDeleteRefreshTo();
            swalLoginRegisterAlert.fire({
              title: `Deleted ${wordsUpperCase(result.data.status)}!`, 
              text: result.data.message, 
              icon: "success",
              iconColor: ccVar2Color,
              color: ccVar7Color,
              confirmButtonColor: ccLargeFontColor,
              background: ccBgVar1Color,
              timer: 11500, // alert timer
            });
          } else {
            await ccGetError(result);
          }
        }
      });
    } catch (error) {
      await ccGetError(error);
    }
  };

  return (
    <>
      {bulkSelectedIds.length > 0 && (
        <Box sx={{mb:2}}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleBulkDelete}
          sx={{
            color: 'white',
            ":hover": {
              backgroundColor: ccBgColor,
            },
          }}
        >
          Bulk Deleted
        </Button>

        <CCSmallButtonGreen 
          startIcon={<AssignmentTurnedInOutlinedIcon />}
          endIcon=""
        >
          Bulk Assigned
        </CCSmallButtonGreen>

        <CCSmallButtonGreen 
          startIcon={<DisabledByDefaultOutlinedIcon />}
          endIcon=""
          sx={{
            backgroundColor:ccVar7Color,
            color: 'white',
            ":hover": {
              backgroundColor: ccBgColor,
            },
          }}
        >
          Bulk Unassigned
        </CCSmallButtonGreen>
        </Box>
      )}
    </>
  );
};

export default BulkDelete;
