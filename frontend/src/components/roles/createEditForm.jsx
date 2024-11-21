import React, {useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom";

import {Box, Button} from '@mui/material';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { 
  ccBgColor,
  ccVar7Color,
  CCButtonSky,
  ccLargeFontColor,
  ccBgVar1Color,
} from "components/mui-customizations/styleCustomization";

import axiosInstance from "plugins/axiosInstance";
import RoleFields from "components/roles/roleFields";
import { useRole } from "components/roles/roleContext";
import { useRoleDispatch } from "components/roles/roleContext";
import { useError } from "errors/errorHook";
import wordsUpperCase from "utilities/wordsUpperCase";
import { swalLWithZIndexAlert } from "components/swal-customizations/styleCustomization";
import Swal from "sweetalert2";


// Init errors
const initErrors = {
  errors: {
    title: '',
    name: '',
    status: '',
  }
}

const CreateEditForm = ({option, id}) => {
  const navigate = useNavigate();

  // Error state
  const [errorState, setErrorState] = useState(initErrors);

  // Error context errors to display 
  const {ccGetError} = useError();

  const {role, initRole, handleSetEditedRole} = useRole();
  const roleDispatch = useRoleDispatch();
  const [editedRole, setEditedRole] = useState(null)

  const fetchDatas = useCallback(async () => {
    if(option === 'edited') {
      if (id) {
        try {
          const result = await axiosInstance.get(`/roles/${id}`)
          if(result.data.status === "success" ) {
            setEditedRole(result.data.role)
          } else {
            setEditedRole(null)
            await ccGetError(result)
          }
        } catch (error) {
          setEditedRole(null)
          await ccGetError(error)
        }
      }
    }
  }, [option, id]);

  useEffect(() => {
    fetchDatas();
  }, [fetchDatas])
  
  useEffect(() => {
    // Dispatch with the latest datas
    if (option === 'edited') {
      if (id && editedRole) {
        roleDispatch({
          type: 'set',
          role: {
            ...editedRole,
          }
        })
      }
    }

    if (option === 'created') {
      roleDispatch({
        type: 'set',
        role: {
          ...initRole,
        }
      })
    }
  }, [option, id, editedRole, initRole, roleDispatch]);

  const handleSubmitEdited = async () => {
    try {
      const result = await axiosInstance.put(`/roles/${role.id}`, role)
      if(result.data.status === "success" ) {
        // setEditedRole(result.data.role)
        await fetchDatas();
        swalLWithZIndexAlert.fire({
          title: `${wordsUpperCase(result.data.status)}!`, 
          text: result.data.message, 
          icon: "success",
          iconColor: ccLargeFontColor,
          color: ccLargeFontColor,
          confirmButtonColor: ccLargeFontColor,
          background: ccBgVar1Color,
        })
      } else {
        await ccGetError(result)
      }
    } catch (error) {
      await ccGetError(error)
    }
  }

  const handleSubmitCreated = async () => {
    try {
      const result = await axiosInstance.post('/roles', role)
      if(result.data.status === "success" ) {
        swalLWithZIndexAlert.fire({
          title: `${wordsUpperCase(result.data.status)}!`, 
          text: result.data.message, 
          icon: "success",
          iconColor: ccLargeFontColor,
          color: ccLargeFontColor,
          confirmButtonColor: ccLargeFontColor,
          background: ccBgVar1Color,
          timer: 1500,
        }).then(result => {
          navigate("/role/list")
        })
      } else {
        await ccGetError(result)
      }
    } catch (error) {
      await ccGetError(error)
    }
  }

  const handleCancleEdited = () => {
    if (id && editedRole) {
      roleDispatch({ 
        type: 'set', 
        role: {
          ...editedRole,
        }
      });
    }
    setErrorState(initErrors);
  }

  const handleCancleCreated = () => {
    roleDispatch({ 
      type: 'changed', 
      role: initRole, 
    });
    setErrorState(initErrors);
  }

  const handleSubmit = useCallback(async (e) => {
    roleDispatch({
      type: "set",
      role: role,
    })

    // Fetch errors if any otherwise triggering to submit
    if (Object.keys(errorState.errors).filter(key => errorState.errors[key]).length > 0) {
      await ccGetError(errorState)
      
    } else {
      e.preventDefault();
      option === 'edited' && handleSubmitEdited()
      option === 'created' && handleSubmitCreated()
    }
  }, [role, errorState, option, handleSubmitEdited, handleSubmitCreated]); // Include relevant dependencies

  const handleCancel = () => {{ 
    option === 'edited' && handleCancleEdited()
    option === 'created' && handleCancleCreated()
  }};

  return (
    <RoleFields 
      errorState={errorState} 
      setErrorState={setErrorState}
      option={option}
    >
      {/* Save, Cancel Button */}
      <Box sx={{gridColumn: 'span 3', mt: 2}}>
        <CCButtonSky 
          startIcon={<SaveAsTwoToneIcon />}
          endIcon=""
          onClick={handleSubmit}
          sx={{ ml: 0 }}
        >
          {option === 'edited' ?  'Save Changes'  : 'Create'}
        </CCButtonSky>

        <Button 
          startIcon={<CancelOutlinedIcon />}
          sx={{
            px: 1.5,
            ml: 2,
            color: 'white',
            bgcolor: ccVar7Color, 
            ":hover": {
              backgroundColor: ccBgColor,
            },
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
      {/* End Save, Cancel Button */}
    </RoleFields>
  )
}

export default CreateEditForm