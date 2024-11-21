import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { useRole, useRoleDispatch } from "components/roles/roleContext";
import { CCAuthTextField, ccVar2Color } from "components/mui-customizations/styleCustomization";
import CCSingleSelect from "components/mui-customizations/singleSelectCustomization";
import { 
  Box, 
  FormControl, 
  FormHelperText, 
  InputLabel, 
  OutlinedInput,
} from '@mui/material';




// Status items to select
const selectItems = [
  { id: 1, value: 'Enable' },
  { id: 2, value: 'Disable' },
];

// Regex to check fields
// First letter, no single char, at least two chars for multi words
// Field value evaluate through regex
const fieldRegex = /^[A-Za-z][A-Za-z0-9]{1,}(?: [A-Za-z0-9]{2,})*$/;
const validateField = value => fieldRegex.test(value);

const RoleFields = ({ children, errorState, setErrorState, option }) => {
  // Edited or created role using role context
  const { role } = useRole();
  const roleDispatch = useRoleDispatch();

  // Selected status state
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = useState('');

  // Confirmed initial selected state and error state set
  useEffect(() => {
    if (role && role.status && Array.isArray(role.status) && role.status.length > 0) {
      setSelectedItems(role.status[0]);
    } else {
      setSelectedItems('');
    }

    setErrorState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
      }
    }));
  }, [role]);

  // Logs of form state
  useEffect(() => {
    // console.log('role', role)
    // console.log('rolestate', roleState)
  }, [errorState]);

  // Error states update and dispatch fields changes to role context
  const handleFieldChange = event => {
    const { name, value } = event.target;

    const error = 
    value.trim() === "" 
    ? `Required ${name} field` 
    : !validateField(value) 
      ? `Invalid ${name} format` 
      : "";

    roleDispatch({
      type: 'changed',
      role: {
        ...role,
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

  const handleSelectOptionChange = (event) => {
    const { name, value } = event.target;
    let selectedValue = value;
    let selectError = '';

    if (selectedValue === '') {
      setSelectedItems('');
      selectError = `Required valid ${name} to select`;
    } else {
      setSelectedItems(selectedValue);
      selectError = ''
    }

   // Update the context with the selected value
    roleDispatch({
      type: 'changed',
      role: {
        ...role,
        [name]: selectedValue ? [selectedValue] : [], // Save as an array or an empty array
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
        name={name}
        label={label}
        type={type}
        value={value}
        id={name}
        placeholder={`Enter role ${label.toLowerCase()}`}
        required
        onChange={handleFieldChange}
        autoComplete="off"
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );

  const renderStatusSelectField = (name, label, items, value = '', error = "") => (
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
      {renderTextField('title', 'Title', 'text', role.title, errorState.errors.title)}
      {renderTextField('name', 'Name', 'text', role.name, errorState.errors.name)}
      {renderStatusSelectField('status', 'Status', selectItems, selectedItems, errorState.errors.status)}
      {children}
    </Box>
  );
};

export default RoleFields;
