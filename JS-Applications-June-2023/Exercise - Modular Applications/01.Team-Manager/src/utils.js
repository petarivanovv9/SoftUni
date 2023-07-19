export const getUserData = () => {
  if (sessionStorage.getItem("accessToken")) {
    return {
      email: sessionStorage.getItem("email"),
      username: sessionStorage.getItem("username"),
      _id: sessionStorage.getItem("_id"),
      accessToken: sessionStorage.getItem("accessToken"),
    };
  }

  return null;
};

export const setUserData = (data) => {
  sessionStorage.setItem("email", data.email);
  sessionStorage.setItem("username", data.username);
  sessionStorage.setItem("_id", data._id);
  sessionStorage.setItem("accessToken", data.accessToken);
};

export const clearUserData = () => {
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("_id");
  sessionStorage.removeItem("accessToken");
};

export const createSubmitHandler = (callback) => {
  return function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    callback(data);
  };
};
