export const getUserData = () => {
  if (!sessionStorage.getItem("accessToken")) {
    return null;
  }

  return {
    _id: sessionStorage.getItem("_id"),
    email: sessionStorage.getItem("email"),
    password: sessionStorage.getItem("password"),
    accessToken: sessionStorage.getItem("accessToken"),
  };
};

export const setUserData = (data) => {
  sessionStorage.setItem("_id", data._id);
  sessionStorage.setItem("email", data.email);
  sessionStorage.setItem("password", data.password);
  sessionStorage.setItem("accessToken", data.accessToken);
};

export const clearUserData = () => {
  sessionStorage.removeItem("_id");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("password");
  sessionStorage.removeItem("accessToken");
};
