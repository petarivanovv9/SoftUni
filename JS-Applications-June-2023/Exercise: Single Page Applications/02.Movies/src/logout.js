import { updateNavBar } from "./utils.js";

export async function logout() {
  console.log("...logout...");

  const user = JSON.parse(sessionStorage.user);

  await fetch(`$http://localhost:3030/users/logout`, {
    method: "GET",
    headers: {
      "X-Authorization": user.accessToken,
    },
  });

  sessionStorage.removeItem("user");

  updateNavBar();
}
