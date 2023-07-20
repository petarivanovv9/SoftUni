import { getUserData } from "../utils.js";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const user = getUserData();

  if (user) {
    options.headers["X-Authorization"] = user.accessToken;
  }

  try {
    const response = await fetch("http://localhost:3030" + url, options);

    if (!response.ok) {
      // const error = await response.json();
      throw new Error("something went wrong");
    }

    return response.json();
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");
