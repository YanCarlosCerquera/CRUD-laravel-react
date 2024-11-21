import { useContext } from "react";
import { ErrorContext } from "errors/errorContext";

const useError = () => {
  return useContext(ErrorContext)
  // const { 
  //   ccGetError, 
  //   ccError, 
  //   ccErrorMessage, 
  //   ccErrorDataMessage, 
  //   ccErrorDataErrors, 
  //   ccErrorStatus, 
  //   ccErrorStatusText, 
  //   ccErrorLoading 
  // } = useContext(ErrorContext);

  // const fetchError = useCallback(async () => {
  //   await ccShowError;
  // }, []);

  // const fetchUser = useCallback(async () => {
  //   if (!loading) {
  //     await handleGetProfile();
  //   }
  // }, [loading, handleGetProfile]);

  // useEffect(() => {
  //   fetchError();
  // }, [fetchError]);

  // return {
  //   ccGetError,
  //   ccError,
  //   ccErrorMessage,
  //   ccErrorDataMessage,
  //   ccErrorDataErrors,
  //   ccErrorStatus,
  //   ccErrorStatusText,
  //   ccErrorLoading,
  // };
};

export {useError};