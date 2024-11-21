import React, { useState } from "react"

import {Box, Button, Paper, Typography} from '@mui/material';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HighlightOutlinedIcon from '@mui/icons-material/HighlightOutlined';

import { 
  ccBgColor,
  ccVar7Color,
  CCButtonSky,
  ccBgVar1Color,
} from "components/mui-customizations/styleCustomization";
import CCMuiBarChart from "charts/mui-customization/ccMuiBarChart";

import axiosInstance from "plugins/axiosInstance";
import { useError } from "errors/errorHook";
import ChartFields from "charts/chartFields";
import wordsUpperCase from "utilities/wordsUpperCase";


// Init chart states
const initChartStates = {
  type: [],
  period: [],
  roles: [],
  years: [],
}

// Init errors
const initErrors = {
  errors: {
    type: '',
    period: '',
  }
}

const BarChart = () => {
  // Error state
  const [errorState, setErrorState] = useState(initErrors);

  // Error context errors to display 
  const {ccGetError} = useError();

  // Chart state
  const [chartState, setChartState] = useState(initChartStates);

  // Show, hide datas
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showAllYears, setShowAllYears] = useState(false);

  // From API record states
  const [dataset, setDataset] = useState([]);
  const [isDataset, setIsDataset] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fetch errors if any otherwise triggering to submit
    if (Object.keys(errorState.errors).filter(key => errorState.errors[key]).length > 0) {
      await ccGetError(errorState)
      setIsDataset(false);
    } else {

      try {
        const result = await axiosInstance.post(`/${chartState.type[0]}/bar/charts`, chartState)
        if(result.data.status === "success" ) {
          setDataset(result.data.dataset);
          setIsDataset(true);
          navigate("/dashboard")
        } else {
          await ccGetError(result)
        }
      } catch (error) {
        await ccGetError(error)
      }
    }
  }

  const handleCancel = () => {
    setChartState ( prevState => ({
      ...prevState,
      ...initChartStates,
    }));
    setShowAllRoles(false);
    setShowAllYears(false);
    setErrorState(initErrors);
    setIsDataset(false);
  }

  return (
    <ChartFields 
      errorState={errorState} 
      setErrorState={setErrorState}
      chartState={chartState} 
      setChartState={setChartState}
      showAllRoles={showAllRoles}
      setShowAllRoles={setShowAllRoles}
      showAllYears={showAllYears}
      setShowAllYears={setShowAllYears}
    >
      {/* Save, Cancel Button */}
      <Box 
        sx={{
          gridColumn: 'span 12',
          // textAlign: 'center'
        }}
      >
        <CCButtonSky 
          startIcon={<SaveAsTwoToneIcon />}
          endIcon=""
          onClick={handleSubmit}
          sx={{
            ml: 0,
            px: 1.35,
          }}
        >
          Submit
        </CCButtonSky>

        <Button 
          startIcon={<CancelOutlinedIcon />}
          sx={{
            px: 1.35,
            ml: 1,
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

      <Box 
        sx={{
          gridColumn: {
            xs: 'span 12',
            sm: 'span 12',
            md: 'span 12',
            lg: 'span 6',
            xl: 'span 6',
          },
          gridColumnStart: 1,
        }}
      >
        {isDataset && dataset.length > 0 && (
          <Paper 
            elevation={3}
            sx={{
              padding: "10px",
              background: ccBgVar1Color,
              mt:5
            }}
          >
            <Typography 
              variant="subtitle2" 
              textAlign="center"
              color={ccBgColor}
              mt={0.5}
            >
              {
              `${wordsUpperCase(chartState.type[0]) || ''} based  ${chartState.period && chartState.period[0] === 1 ? ' monthly' : ' yearly'} users`
              } 
            </Typography>
            <Typography 
              variant="body2" 
              textAlign="center"
              color={ccBgColor}
              mb={3}
              fontSize={12}   
            >
              (
                <HighlightOutlinedIcon 
                  sx={{ 
                    fontSize: 14, 
                    verticalAlign: 'middle', 
                    color:ccVar7Color,
                    mr: 0.5,
                  }} 
                /> 
                Datas, based on availability, based on {new Date().getFullYear()} if no year selected.)
            </Typography>
            <CCMuiBarChart dataset={dataset} />
          </Paper>
        )}
      </Box>
    </ChartFields>
  )
}

export default BarChart;