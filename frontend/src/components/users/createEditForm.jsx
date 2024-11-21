import React, { useEffect, useState, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import {Box, Button} from '@mui/material';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Swal from "sweetalert2";
import axiosInstance from "plugins/axiosInstance";
import UserFields from "components/users/userFields";
import { useAuth } from "auths/hooks/authHook";
import { useUser } from "components/users/userContext";
import { useRole } from "components/roles/roleContext";
import { useUserDispatch } from "components/users/userContext";
import { useError } from "errors/errorHook";
import wordsUpperCase from "utilities/wordsUpperCase";
import useCurrentPages from "../layouts/hooks/currentPagesHook";
import { swalLWithZIndexAlert } from "components/swal-customizations/styleCustomization";
import { 
  ccBgColor,
  ccVar7Color,
  CCButtonSky,
  ccLargeFontColor,
  ccBgVar1Color,
} from "components/mui-customizations/styleCustomization";




// Init errors
const initErrors = {
  errors: {
    name: '',
    username: '',
    email: '',
    status: '',
    roles: '',
    password: '',
    passwordConfirmation: ''
  }
}

const CreateEditForm = ({option, id}) => {
  const navigate = useNavigate();

  // Error state
  const [errorState, setErrorState] = useState(initErrors);

  // Error context to display errors
  const {ccGetError} = useError();

  // Current page start path
  const {currentFirstPath} = useCurrentPages();

  const {fetchProfile, profile, handleSetEditedProfile} = useAuth();
  const {user, initUser} = useUser();
  const { allRoles, fetchAllRoles } = useRole();
  const userDispatch = useUserDispatch();
  const [editedUser, setEditedUser] = useState(null);

  /**
  * Mounting either 'edited' or 'created' mode
  * Both cases fetches fresh 'role' datas
  * Supplied 'id' fetches fresh user datas
  * Without 'id' fetches fresh profile datas
  * Fetches confirming latest datas
  */

  const fetchDatas = useCallback(async () => {
    if(option === 'edited') {
      if (id) {
        try {
          const result = await axiosInstance.get(`/users/${id}`);
          if (result.data.status === "success") {
            setEditedUser(result.data.user);
          } else {
            setEditedUser(null);
            await ccGetError(result);
          }
        } catch (error) {
          setEditedUser(null);
          await ccGetError(error);
        }
      } else {
        await fetchProfile();
      }
    }
    await fetchAllRoles();
  }, [option, id, profile]);

  useEffect(() => {
    fetchDatas();
  }, [fetchDatas])

  useEffect(() => {
    // Dispatch with the latest datas
    if (option === 'edited') {
      if (id && editedUser) {
        const roleIds = editedUser.roles.map(role => role.id);
        userDispatch({
          type: 'set',
          user: {
            ...editedUser,
            roles: roleIds,
          },
        });
      } else {
        if (profile) {
          const roleIds = profile.roles.map(role => role.id);
          userDispatch({
            type: 'set',
            user: {
              ...profile,
              roles: roleIds,
            },
          });
        }
      }
    }

    if (option === 'created') {
      userDispatch({
        type: 'set',
        user: {
          ...initUser,
        }
      })
    }
  }, [option, id, editedUser, initUser, userDispatch]);

  const handleSubmitEdited = async () => {
    try {
      const result = await axiosInstance.put(`/users/${user.id}`, user)
      if(result.data.status === "success" ) {
        // if (currentFirstPath === 'profile') {
        //   await fetchProfile();
        //   // const profileData = await fetchProfile();
        //   // handleSetEditedProfile(profileData.data.profile)
        // } else {
        //   await fetchDatas();
        // }

        await fetchDatas();

        // currentFirstPath === 'profile' ? await handleSetEditedProfile(result.data.user) : setEditedUser(result.data.user);
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
      const result = await axiosInstance.post('/users', user)
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
          navigate("/user/list")
        })
      } else {
        await ccGetError(result)
      }
    } catch (error) {
      await ccGetError(error)
    }
  }

  const handleCancleEdited = () => {
    if (id && editedUser) {
      const roleIds = editedUser.roles.map(role => role.id);
      userDispatch({ 
        type: 'set', 
        user: {
          ...editedUser,
          roles: roleIds,
        }
      });
    }
    setErrorState(initErrors);
  }

  const handleCancleCreated = () => {
    userDispatch({ 
      type: 'changed', 
      user: initUser, 
    });
    setErrorState(initErrors);
  }

  const handleSubmit = useCallback(async (e) => {
    userDispatch({
      type: "set",
      user: user,
    });
    
    // Fetch errors if any otherwise triggering to submit
    if (Object.keys(errorState.errors).filter(key => errorState.errors[key]).length > 0) {
      await ccGetError(errorState);
      
    } else {
      e.preventDefault();
      option === 'edited' && handleSubmitEdited()
      option === 'created' && handleSubmitCreated()
    }
  }, [user, errorState, option, handleSubmitEdited, handleSubmitCreated, userDispatch]); // Include relevant dependencies

  
  const handleCancel = () => {{ 
    option === 'edited' && handleCancleEdited()
    option === 'created' && handleCancleCreated()
  }};

  return (
    <UserFields 
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
    </UserFields>
  )
}

export default CreateEditForm