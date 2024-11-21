import React, { 
  createContext, 
  useState, 
  useEffect, 
  useCallback 
} from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getProfile,
} from "auths/services/authService";


const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [isProfile, setIsProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getProfile();
      if (response && response.data && response.data.profile) {
        setProfile(response.data.profile);
        setIsProfile(true);
        return response;
      } else {
        setProfile(null);
        setIsProfile(false);
      }
    } catch (error) {
      setProfile(null);
      setIsProfile(false);
      // return error;
    } finally {
      setProfileLoading(false);
    }
  }, []);

  // Load profile data once on initial render or when authentication state changes
  // Ensure loading is false if already authenticated
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    // This will run once when the component is mounted
    console.log("Component mounted");

    // Optional: Return a cleanup function to run when the component unmounts
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  // const handleLogin = async (credentials) => {
  //   try {
  //     const response = await loginService(credentials);
  //     if (response && response.data && typeof response.data.user !== 'undefined' ) {
  //       setProfile(response.data.user);
  //       setIsProfile(true);
  //       return response;
  //     } else {
  //       setProfile(null);
  //       setIsProfile(false);
  //       return response;
  //     }
  //   } catch (error) {
  //     setProfile(null);
  //     setIsProfile(false);
  //     return error;
  //   }
  // };
  
  const handleLogin = async (credentials) => {
    try {
      const response = await loginService(credentials);
      if (response && response.data && typeof response.data.user !== 'undefined' ) {
        await fetchProfile();
        return response;
      } else {
        setProfile(null);
        setIsProfile(false);
        return response;
      }
    } catch (error) {
      setProfile(null);
      setIsProfile(false);
      return error;
    }
  };

  // const handleRegister = async (data) => {
  //   try {
  //     const registeredUser = await registerService(data);
  //     return registeredUser;
  //   } catch (error) {
  //     // ccGetError(error.response.data.errors)
  //     // console.log('only message', ccShowError)
  //     // console.log('only message1', ccError)
  //     // throw new Error("Registration failed");
  //     // showError('Failed to register');
  //     // console.log('error', error)
  //     // console.log('only message', error.message)
  //     // console.log('response message', error.response.data.message)
  //     // console.log('response errors', error.response.data.errors)
  //     // console.log('response status', error.response.status)
  //     // console.log('response status text', error.response.statusText)
  //     await ccGetError(error);
  //   }
  // };

  const handleRegister = async (data) => {
    try {
      const response = await registerService(data);
      return response;
    } catch (error) {
      return error
    }
  };

  const handleSetEditedProfile = async (profileData) => {
    try {
      const response = await profileData
      setProfile(response);
      setIsProfile(true);
      return response;
    } catch (error) {
      setProfile(null);
      setIsProfile(false);
      return error;
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     // console.log("Calling logout service...");
  //     const response = await logoutService();
  //     // console.log("Logout service called");
  //     setProfile(null);
  //     setIsProfile(false);
  //     // return response;
  //   } catch (error) {
  //     // console.error("Logout failed:", error);
  //     // showError('Logout failed');
  //   }
  // };

  const handleLogout = async () => {
    try {
      await logoutService();
      setProfile(null);
      setIsProfile(false);
      return {
        'status': 'success',
        'message': 'Successfully logged out.'
      };
    } catch (error) {
      // console.error("Logout failed:", error);
      // showError('Logout failed');
      return error
    }
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        isProfile,
        profileLoading,
        handleLogin,
        handleRegister,
        handleLogout,
        // handleGetProfile,
        fetchProfile,
        handleSetEditedProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export {AuthContext};
