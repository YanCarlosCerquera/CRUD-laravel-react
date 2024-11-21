import axiosInstance from "plugins/axiosInstance"




// Function to get CSRF token
const getCsrfToken = async () => {
  await axiosInstance.get("/sanctum/csrf-cookie");
};

// Function to login user
// const login = async (credentials) => {
//   try {
//     await getCsrfToken(); // This sets the CSRF token in the browser's cookies
//     const response = await axiosInstance.post("/auth/login", credentials);
//     try {
//       localStorage.setItem("auth_token", response.data.access_token);
//       return response;
//     } catch (error) {
//       return error
//     }
//   } catch (error) {
//     return error;
//   }
// };

const login = async (credentials) => {
  try {
    await getCsrfToken(); // This sets the CSRF token in the browser's cookies
    const response = await axiosInstance.post("/auth/login", credentials);
    localStorage.setItem("auth_token", response.data.access_token);
    return response;
  } catch (error) {
    return error;
  }
};

// Function to register user
const register = async (data) => {
  try {
    await getCsrfToken(); // This sets the CSRF token in the browser's cookies
    const response = await axiosInstance.post("/auth/register", data);
    return response
  } catch (error) {
    return error
  }
};

// Function to logout user
const logout = async () => {
  await axiosInstance.post("/auth/logout");
  localStorage.removeItem("auth_token");
  document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

// const getProfile = async () => {
//   const response = await axiosInstance.get("/auth/profile");
//   if (response && response.data.profile) {
//     return response.data.profile;
//   }
//   return null;
// };

const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/auth/profile");
    return response;
  } catch (error) {
    return error
  }
};

export {
  login,
  register,
  logout,
  getProfile,
}