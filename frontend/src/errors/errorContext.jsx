import * as React from 'react';
import { createContext, useState, useEffect, useRef} from "react";
import {Snackbar, Alert} from '@mui/material';
import { 
  ccSubBgColor, 
  ccBgVar1Color,
  ccVar5Color,
  ccVar6Color,
  ccVar7Color,
} from 'components/mui-customizations/styleCustomization';
// import { ccGetError as errorService } from "errors/errorService";




const ErrorContext = createContext("");  

const ErrorProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [ccError, setCCError] = useState(null);
  const [ccErrorErrors, setCCErrorErrors] = useState(null);
  const [ccErrorMessage, setCCErrorMessage] = useState(null);
  const [ccErrorDataMessage, setCCErrorDataMessage] = useState(null);
  const [ccErrorDataErrors, setCCErrorDataErrors] = useState(null);
  const [ccErrorStatus, setCCErrorStatus] = useState(null);
  const [ccErrorStatusText, setCCErrorStatusText] = useState(null);
  const [ccIsError, setCCIsError] = useState(false);
  const ccIsErrorRef = useRef(ccIsError);
  const [ccErrorLoading, setCCErrorLoading] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCCError(null);
    setOpen(false);
  };

  // const fetchCCError = useCallback(async (data) => {
  //   try {
  //     setCCShowError(data);
  //   } catch (error) {
  //     // console.error(error.message);
  //     setCCShowError(null);
  //     setCCError(null)
  //   } finally {
  //     setCCErrorLoading(false);
  //   }
  // }, []);

        // console.log('error', error)
      // console.log('only message', error.message)
      // console.log('response message', error.response.data.message)
      // console.log('response errors', error.response.data.errors)
      // console.log('response status', error.response.status)
      // console.log('response status text', error.response.statusText)

  useEffect(() => {
    if (ccError) {
      handleClick();
      try {
        if (ccError.errors) {
          setCCErrorErrors(ccError.errors);
          setCCIsError(true)
        } else {
          setCCErrorErrors(null);
          setCCIsError(false)
        }

        if (ccError.message) {
          setCCErrorMessage(ccError.message);
          setCCIsError(true)
        } else {
          setCCErrorMessage(null);
          setCCIsError(false)
        }

        if (ccError.response) {
          setCCErrorDataMessage(ccError.response.data.message);
          setCCErrorDataErrors(ccError.response.data.errors);
          setCCErrorStatus(ccError.response.status);
          setCCErrorStatusText(ccError.response.statusText);
          setCCIsError(true)
        } else {
          setCCErrorDataMessage(null);
          setCCErrorDataErrors(null);
          setCCErrorStatus(null);
          setCCErrorStatusText(null);
          setCCIsError(false)
        }
      } catch (error) {
        // console.error(error.message);
        console.error('Error processing ccError:', error);  
        setCCErrorErrors(null);
        setCCErrorMessage(null);
        setCCErrorDataMessage(null);
        setCCErrorDataErrors(null);
        setCCErrorStatus(null);
        setCCErrorStatusText(null);
        setCCIsError(false)
      } finally {
        setCCErrorLoading(false);
      }
    }
  }, [ccError]);

  // update the ref whenever ccIsError changes
  useEffect(() => {
    // ccIsErrorRef.current = ccIsError; 
    // setCCErrorLoading(true);
  }, [ccIsError]);

  // useEffect(() => {
  //   try {
  //     setCCShowError(ccError);
  //   } catch (error) {
  //     alert()
  //     // console.error(error.message);
  //     setCCShowError(null);
  //     setCCError(null)
  //   } finally {
  //     setCCErrorLoading(false);
  //   }
  // }, [ccError]);

  const ccGetError = async (data) => {
    try {
      const errorData = await data;
      setCCError(errorData);
    } catch (error) {
      setCCError(null);
    }
  };

  const alertStyling = {
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '5px',
    backgroundColor: `${ccBgVar1Color}de`,
    color: `${ccVar7Color}c7`,
  }

  const alertTitleStyling = {
    color: ccVar6Color,
  }

  const divStyling = {
    ...alertStyling,
    padding:'5px 15px 5px 15px',

  }

  const ulLiStyling = {
    ...alertStyling,
    padding:'5px 15px 5px 25px',
  }

  return (
    <ErrorContext.Provider
      value={{
        ccGetError,
        ccError,
        ccErrorErrors,
        ccErrorMessage,
        ccErrorDataMessage,
        ccErrorDataErrors,
        ccErrorStatus,
        ccErrorStatusText,
        ccIsError,
        ccErrorLoading,
      }}
    >
      {children}
      { (ccError && typeof ccError != undefined && Object.keys(ccError).length > 0 && !Object.keys(ccError).includes('data') ) && 
        <>
          <Snackbar 
            open={open} 
            autoHideDuration={3000}
            onClose={handleClose}
            sx={{
              
              borderRadius: '8px',
              "& .MuiPaper-root": {
                backgroundColor: `${ccSubBgColor}e3`,
                padding: "0 8px",
                borderRadius: "5px",
                border: `10px solid ${ccVar7Color}c7`,
              }
            }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {ccErrorStatus && (
                  <div>
                    <span style={alertTitleStyling}>Status: </span> 
                    {ccErrorStatus}
                  </div>
              )}

              {ccErrorDataMessage && (
                  <div>
                    <span style={alertTitleStyling}>Data Message: </span>
                    {ccErrorDataMessage}
                  </div>
              )}

              {ccErrorDataErrors && (
                <div>
                  <span style={alertTitleStyling}>Server Errors: </span>
                  { typeof ccErrorDataErrors === 'object' ? (
                    <ul style={ulLiStyling}>
                      {Object.keys(ccErrorDataErrors).map((key) => (
                        <li key={key}>
                          {key}: {ccErrorDataErrors[key]}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ccErrorDataErrors
                  )}
                </div>
              )}

              {ccErrorErrors && (
                <div>
                  <span style={alertTitleStyling}>UI Errors: </span>
                    <ul style={ulLiStyling}>
                      {
                        Object.keys(ccErrorErrors).filter(key => ccErrorErrors[key]).map((key) => (
                          <li key={key}>
                            {key}: {ccErrorErrors[key]}
                          </li>
                        ))
                      }
                    </ul>
                </div>
              )}
              {/* very important: you wn't see the error logs if delete */}
              {/* {console.log('sp', ccError)}  */}
            </Alert>
          </Snackbar>
        </>
      }
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
export {ErrorContext};
