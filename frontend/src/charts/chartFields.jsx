import React, { useState, useEffect } from "react";

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { CCAuthTextField, ccVar2Color } from "components/mui-customizations/styleCustomization";
import CCSingleSelect from "components/mui-customizations/singleSelectCustomization";
import CCMultiSelect from "components/mui-customizations/multiSelectCustomization";
import { 
  Box, 
  FormControl, 
  FormHelperText, 
  InputLabel, 
  OutlinedInput,
} from '@mui/material';

// import { useRole } from "components/roles/roleContext";
import axiosInstance from "plugins/axiosInstance";
import { useError } from "errors/errorHook";


// Status items to select
const selectTypeItems = [
  { id: 'roles', value: 'Role' },
  { id: 'users', value: 'User' },
]

const selectPeriodItems = [
  { id: 1, value: 'Month' },
  { id: 2, value: 'Year' },
];

const ChartFields = ({
  children, 
  chartState, 
  setChartState, 
  errorState, 
  setErrorState, 
  showAllRoles, 
  setShowAllRoles,
  showAllYears,
  setShowAllYears,
}) => {
  // Load allRoles and show conditionally based on role type
  // const {allRoles} = useRole();

  const {ccGetError} = useError();

  const [ selectRoleItems, setSelectRoleItems] = useState([]);
  const [ selectYearItems, setSelectYearItems] = useState([]);
  const [ allChartRoles, setAllChartRoles] = useState([]);
  const [ allChartYears, setAllChartYears] = useState([]);

  // Theme to customize form
  const theme = useTheme();

  // Handler to fetch data when changes (roles, period)
  const loadAllChartRoles = async (resource) => {
    try {
      // const result = await axiosInstance.get(`roles/bar/charts`);
      const result = await axiosInstance.get(`/${resource}/bar/charts`)
      if(result.data.status === "success" ) {
        setAllChartRoles(await result.data.allChartRoles);
        setAllChartYears(await result.data.allChartYears);
      } else {
        setAllChartRoles([]);
        setAllChartYears([]);
        await ccGetError(result);
      }
    } catch (error) {
      await ccGetError(error);
    }
  }

  // Confirmed initial datas state and errors state set
  useEffect(() => {
    setChartState ( prevState => ({
      ...prevState,
      ...chartState
    }));

    setErrorState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
      }
    }));
  }, [setErrorState, setChartState]);

  // // Formatting roles fields data for drop down field
  // useEffect(()=> {
  //   const mappedRoles = allRoles.map(role => ({
  //     id: role.id, value: role.title
  //   }))
  //   setSelectRoleItems(mappedRoles);
  // }, [setSelectRoleItems, allRoles])

  
  // Formatting data for drop down fields
  useEffect(()=> {
    const mappedRoles = allChartRoles.map(role => ({
      id: role.id, value: role.title
    }));
    setSelectRoleItems(mappedRoles);

    const mappedYears = allChartYears.map(year => ({
      id: year, value: year
    }));
    setSelectYearItems(mappedYears);
  }, [allChartRoles, allChartYears])


  const handleSelectOptionChange = async (event) => {
    const { name, value } = event.target;

    const selectedValue = (Array.isArray(value)) && (value.length > 0) 
    ? value 
    : (typeof value === 'string' || typeof value === 'number' 
      ? [value]
       : []);

    let selectError = '';

    // Roles field show toggle based on type 'roles'
    if ( value === 'roles' && name === 'type') {
      await loadAllChartRoles(value);
      setShowAllRoles(true);

    } else if (value === 2 && name === 'period') {
      setShowAllYears(true);
      
    } else if ( value === 'users'  && name === 'type') {
      setShowAllRoles(false);

    } else if ( value === 1 && name === 'period') {
      setShowAllYears(false);
    }

    if (selectedValue.length > 0) {
      selectError = ''
    } else {
      name === 'roles' || name === 'years'  
      ? selectError = '' 
      : selectError = `Required valid ${name} to select`;
    }

    // Update chart state
    setChartState ( prevState => ({
      ...prevState,
      [name]: selectedValue,
    }));

    // Update the error state with errors if any
    setErrorState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [name]: selectError
      }
    }));
  };

  const renderSelectField = (name, label, items, value = '', error = "") => (
    <FormControl 
      sx={{ 
        gridColumn: {
          xs: "span 12", 
          sm: "span 6", 
          md: "span 6", 
          lg: 'span 3', 
          xl: 'span 3'
        }
      }} 
      size="small" 
      required error={false}
    >
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
      <FormHelperText 
        sx={{ 
          color: error ? theme.palette.error.main : 'inherit' 
        }}
      >
        {error}
      </FormHelperText>
    </FormControl>
  );

  const renderMultiSelectField = (name, label, items, value = '', required=false, error = "") => (
    <FormControl 
      sx={{ 
        gridColumn: {
          xs: "span 12", 
          sm: "span 12", 
          md: "span 12", 
          lg: 'span 6', 
          xl: 'span 6'
        }
      }} 
      size="small" 
      required={required}
      error={false}
    >
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
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 1,
        width: '100%',
      }}
      noValidate
      autoComplete="on"
    >
      {renderSelectField('type', 'Type', selectTypeItems, chartState.type[0], errorState.errors.type)}
      {renderSelectField('period', 'Period', selectPeriodItems, chartState.period[0], errorState.errors.period)}
      { showAllRoles && (
        renderMultiSelectField('roles', 'Role(s)', selectRoleItems, chartState.roles, false, errorState.errors.roles)
      )} 
      { showAllYears && (
        renderMultiSelectField('years', 'Year(s)', selectYearItems, chartState.years, false, errorState.errors.years)
      )} 
      {children}
    </Box>
  );
};

export default ChartFields;