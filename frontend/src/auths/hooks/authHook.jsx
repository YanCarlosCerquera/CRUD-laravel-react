import { useContext } from "react";
import { AuthContext } from "auths/contexts/authContext";

const useAuth = () => {
  return useContext(AuthContext)
};

export {useAuth};