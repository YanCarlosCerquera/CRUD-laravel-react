import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRole } from "components/roles/roleContext";
import { useUser, useUserDispatch } from "components/users/userContext";
import { CCAuthTextField, ccVar2Color } from "components/mui-customizations/styleCustomization";
import CCSingleSelect from "components/mui-customizations/singleSelectCustomization";
import CCMultiSelect from "components/mui-customizations/multiSelectCustomization";
import { 
  Box, 
  FormControl, 
  FormHelperText, 
  InputLabel, 
  OutlinedInput, 
  InputAdornment, 
  IconButton 
} from '@mui/material';




// Status items to select
const selectStatus = [
  { id: 1, value: 'Enable' },
  { id: 2, value: 'Disable' },
];

// Regex to check email
// Regex to check fields
// First letter, no single char, at least two chars for multi words
// Field value evaluate through regex
// E-mail field value evalute through regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldRegex = /^[A-Za-z][A-Za-z0-9]{1,}(?: [A-Za-z0-9]{2,})*$/;
const validateField = value => fieldRegex.test(value);
const validateEmail = email => emailRegex.test(email);


const UserFields = ({children, errorState, setErrorState, option}) => {
  // Edited or created user using user context
  const { user, profile } = useUser();
  const { allRoles, fetchAllRoles } = useRole();
  const userDispatch = useUserDispatch();

  // Selected status state
  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = useState([]);

  // Role list state using role context to select
  const [selectRoles, setSelectRoles] = useState([])


  // Password visibility eye icon toggle
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    return setShowPassword((show) => !show);
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const mappedRoles = allRoles.map(role => ({
      id: role.id, value: role.title
    }))
    setSelectRoles(mappedRoles)
  }, [allRoles])

  // Confirmed initial selected state and error state set
  useEffect(() => {
    // if (user && user.status && Array.isArray(user.status) && user.status.length > 0) {
    //   setSelectedStatus(user.status[0]);
    // } else {
    //   setSelectedStatus('');
    // }
  
    // if (user && user.role && Array.isArray(user.role) && user.role.length > 0) {
    //   setSelectedStatus(user.role);
    // } else {
    //   setSelectedStatus([]);
    // }

    setErrorState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
      }
    }));
  }, [user]);

  // Logs of error state
  useEffect(() => {
    // console.log('user', user)
    // console.log('errorState', errorState)
  }, [errorState]);

  // Updated field states to user context, updated error states
  const handleFieldChange = event => {
    const { name, value } = event.target;

    const error = 
    name === 'email'
    ? value.trim() === "" 
      ? `Required ${name} field` 
      : !validateEmail(value) 
        ? `Invalid ${name} format` 
        : ""
    : value.trim() === "" 
      ? `Required ${name} field` 
      : !validateField(value) 
        ? `Invalid ${name} format` 
        : "";

    userDispatch({
      type: 'changed', 
      user: { 
        ...user, 
        [name]: value 
      } 
    });

    setErrorState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [name]: error
      }
    }));
  };


  // Password changes status and error update if any
  const handlePasswordChange = event => {
    const { name, value } = event.target;

    const passwordError = value.length > 0 && value.length < 8 ? 'Password must be at least 8 characters' : '';
    const passwordConfirmationError = value !== user.password_confirmation ? 'Passwords do not match' : '';

    userDispatch({
      type: 'set', 
      user: { 
        ...user, 
        [name]: value,
      } 
    });

    setErrorState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [name]: passwordError,
        passwordConfirmation: passwordConfirmationError
      }
    }));
  };

  // Confirm password changes status and error update if any
  const handlePasswordConfirmationChange = event => {
    const { name, value } = event.target;

    userDispatch({
      type: 'changed', 
      user: { 
        ...user, 
        [name]: value 
      } 
    });

    setErrorState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        passwordConfirmation: value !== user.password ? 'Passwords do not match' : ''
      }
    }));
  };


  const handleSelectOptionChange = event => {
    const { name, value } = event.target;
    const selectedValue = Array.isArray(value) && value.length > 0 ? value : Number(value) > 0 ? [value] : [];
    let selectError = '';

    if (selectedValue.length === 0) {
      selectError = `Required valid ${name} to select`;
    } else {
      selectError = ''
    }

    // Update the context with the selected value
    userDispatch({
      type: 'changed',
      user: {
        ...user,
        [name]: selectedValue,
      }
    });
    
    // Update the error state with errors if any
    setErrorState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [name]: selectError
      }
    }));
  };

  const renderTextField = (name, label, type = "text", value = "", error = "") => (
    <FormControl sx={{ gridColumn: "span 1" }} error={!!error}>
      <CCAuthTextField
        type={type === "password" ? (showPassword ? "text" : type) : type}
        name={name}
        id={name}
        label={label}
        value={type === "password" ? value ? value : "" : value}
        placeholder={`Enter ${label.toLowerCase()}`}
        required={type === "password" ? option === 'edited' ? false : true : true}
        onChange={
          name.includes("password")
            ? name === "password"
              ? handlePasswordChange
              : handlePasswordConfirmationChange
            : handleFieldChange
        }
        autoComplete={type === "password" ? "new-password" : "on"}
        endAdornment={
          type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );

  const renderSelectField = (name, label, items, value = '', error = "") => (
    <FormControl sx={{ gridColumn: "span 1" }} size="small" required error={false}>
      <InputLabel id={`${name}-label`} sx={{ color: ccVar2Color }}>{label}</InputLabel>
      <CCSingleSelect
        name={name}
        value={value}
        id={name}
        labelId={`${name}-label`}
        onChange={handleSelectOptionChange}
        input={<OutlinedInput id={`${name}-select`} label={label} />}
        items={items}
        // multiple
      />
      <FormHelperText sx={{ color: error ? theme.palette.error.main : 'inherit' }}>{error}</FormHelperText>
    </FormControl>
  );

  const renderMultiSelectField = (name, label, items, value = '', error = "") => (
    <FormControl sx={{ gridColumn: "span 1" }} size="small" required error={false}>
      <InputLabel id={`${name}-label`} sx={{ color: ccVar2Color }}>{label}</InputLabel>
      <CCMultiSelect
        name={name}
        value={value}
        id={name}
        labelId={`${name}-label`}
        onChange={handleSelectOptionChange}
        input={<OutlinedInput id={`${name}-select`} label={label} />}
        items={items}
        multiple
      />
      <FormHelperText sx={{ color: error ? theme.palette.error.main : 'inherit' }}>{error}</FormHelperText>
    </FormControl>
  );

  return (
    <Box
      component="form"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',    
        gap: 2,
        width: '100%',
      }}
      noValidate
      autoComplete="off"
    >
      {renderTextField('name', 'Name', 'text', user.name, errorState.errors.name)}
      {renderTextField('username', 'Username', 'text', user.username, errorState.errors.username)}
      {renderTextField('email', 'E-mail', 'email', user.email, errorState.errors.email)}
      {renderTextField('password', 'Password', 'password', user.password, errorState.errors.password)}
      {renderTextField('password_confirmation', 'Password Confirmation', 'password', user.password_confirmation, errorState.errors.passwordConfirmation)}
      {renderSelectField('status', 'Status', selectStatus, user.status[0], errorState.errors.status)}
      {renderMultiSelectField('roles', 'Role(s)', selectRoles, user.roles, errorState.errors.roles)}                                                             
      {children}
    </Box>
  );
};

export default UserFields;