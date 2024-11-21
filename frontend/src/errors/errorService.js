// Function to get error
const ccGetError = async (data) => {
  const response = await data
  localStorage.setItem("cc_get_error", response);
  if (response) {
    return response;
  }
  return null;
};

export {ccGetError}